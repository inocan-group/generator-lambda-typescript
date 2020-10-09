# Vitepress Documententation

Your documentation is based off of [Vitepress](https://github.com/vuejs/vitepress) which in turn is based off the *ideas* which [Vuepress](https://vuepress.vuejs.org/) introduced but is currently less mature and has less available "out of the box" but unlike Vuepress it lets you use VueJS 3.x (which is now an official release). 

Over time the functionality Vitepress bring will undoubtedly improve and currently the documentation for Vitepress (very limited) can sometimes be supplemented by reviewing Vuepress docs (though your mileage will vary). You may also want to review the docs for [**Vite**](https://github.com/vitejs/vite) too as Vitepress doesn't just derive it's name from **Vite**.

## Getting Started with Docs

### Configuration

The configuration for your documentation will be found in the `docs/.vitepress` folder and the entry point to configuration is the `config.js` file.

### Developer Preview

When writing docs you'll often want to start up a local web server to get live previews of your documentation. This can be done with:

```sh
# yarn
yarn docs
# npm
npm run docs
```

### Deploy Site

When you deploy to sites like **Netlify** you can have them run a build script to generate the production ready code for your documentation site:

```sh
# yarn
yarn build:docs
# npm
npm run build:docs
```