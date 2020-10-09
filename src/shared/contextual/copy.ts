import { IDictionary } from "common-types";
import { DevopsError } from "do-devops";
import { Generator } from "../../Generator";
import { join } from "path";
import glob from "globby";

let _copy: ICopy;

/**
 * Copies a file, files, or glob patterns of files from the source templates into
 * the destination repo. Examples include:
 *
 * ```typescript
 * import { copy } from "@/shared";
 * // copy a single file
 * copy("foobar.txt");
 * // copy with template changes and changed dest file naming
 * copy("foobar-baz.txt", {
 *  dictionary: { year: 2020 },
 *  destination: (f,p) => f.replace("-baz", "")
 * })
 * // copy all files with .ts extension to destination
 * copy("**\/*.ts", { useGlob: true });
 * ```
 */
export const copy: ICopy = (files, options) => {
  if (!_copy) {
    throw new DevopsError(
      `Attempt to copy template files before the copy command was initialized!`,
      "not-ready"
    );
  }

  return _copy(files, options);
};

export interface ICopyOptions {
  /**
   * Allows setting to `true` when you want to state glob patterns rather than files.
   * The default is `false`.
   */
  isGlob?: boolean;
  /**
   * Allows you to provide a key/value dictionary of template variables; these keys will
   * then be looked for in the documents and replaced with the _value_.
   *
   * The syntax in the documents will be of the form of:
   *
   * ```
   * This repo was brought to you by <%= organization %>
   * ```
   *
   * and you can use the `IConfig` type to get all config variables that this
   * scaffolding provides.
   */
  dictionary?: IDictionary;

  /**
   * Allows the _filename_ or the _path_ (or both) to be modified before being saved to the
   * destination filesystem.
   *
   * **Note:** by default all `_` characters in the filename are converted to `.` if you define this function
   * then this default behavior will go away so you must replace it yourself if this was intended to be
   * preserved.
   *
   * **Note:** returning just a single string -- versus a two string tuple -- will preserve the
   * _path_ and only replace the filename
   */
  destination?: (f: string, d: string) => [file: string, dir: string] | string;

  /**
   * if this flag is set, the command return an array of input and output files
   */
  dryRun?: true;
}

export interface ICopy {
  (files: string | string[], options: ICopyOptions): Promise<void>;
}

/**
 * Provides the `copy` command with the context it needs to do it's job
 *
 * @param ctx the Generator object
 */
export const copyConfigurator = (ctx: Generator) => {
  const copy: ICopy = async (files, options = {}): Promise<void> => {
    if (!Array.isArray(files)) {
      files = [files];
    }
    if (options.isGlob) {
      files = await glob(files);
    }

    files.forEach((f) => {
      const source = join(ctx.sourceRoot(), f);
      const [dir, file] = convert(f, options.destination);
      if (options.dictionary) {
        ctx.fs.copyTpl(source, join(ctx.destinationPath(), dir, file), options.dictionary);
      } else {
        ctx.fs.copy(source, join(ctx.destinationPath(), dir, file));
      }
    });

    return Promise.resolve();
  };

  _copy = copy;
  return copy;
};

const defaultConverter: ICopyOptions["destination"] = (file, dir) => {
  return [dir, file.replace(/^_/, ".")];
};

/**
 * Converts file and/or path using a converter (default or passed in) and then
 * returns a tuple as [dir, file]
 */
function convert(
  filepath: string,
  customConverter?: ICopyOptions["destination"]
): [dir: string, file: string] {
  const [file, dir] = splitFileAndDir(filepath);
  const converter = customConverter || defaultConverter;
  const converted = converter(file, dir);
  const [convFile, convDir] = Array.isArray(converted) ? converted : [converted, dir];

  return [convFile, convDir];
}

function splitFileAndDir(filepath: string): [string, string] {
  const parts = filepath.split(/[/\\]/);
  const dir = parts.length > 1 ? parts.slice(0, parts.length - 1).join("/") : ".";
  return [dir, parts.slice(-1).pop()];
}

function outputFilename(file: string, dir: string, converter?: ICopyOptions["destination"]) {
  if (!converter) return join(dir, file);

  const [newFile, newDir] = converter(file, dir);
  return join(newDir || dir, newFile);
}
