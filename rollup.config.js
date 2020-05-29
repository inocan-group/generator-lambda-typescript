import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "generators/app",
      format: "cjs",
      sourcemap: true,
    },

    external: [],
    plugins: [
      typescript({
        tsconfig: "tsconfig.cjs.json",
      }),
    ],
  },
];
