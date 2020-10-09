## Getting Started with Docs

### Plugins

We have added the following plugins to start you out:

- `@vuepress/back-to-top`
- `@vuepress/last-updated`
- `@vuepress/medium-zoom`

### Configuration

The configuration for your documentation will be found in the `docs/.vuepress` folder and the entry point to configuration is the `config.js` file. Vuepress has great documentation so please bookmark their docs:

- [Vuepress Docs](https://vuepress.vuejs.org/)

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

Often you'll want this page (aka, the home page) to display a nice visual/structured overview of your docs/repo/etc. This is a provided widget with Vuepress and involves using _frontmatter_. You'll want to put something like the following into the first lines of this file and Vuepress will convert the layout of this page for you:

```md
---
home: true
heroImage: hero.jpg
heroText: Logo for <%= serviceName %>
tagLine: A tagline, if you want one

actionText: Get Started →
actionLink: /getting-started/

features:
  - title: Foo
    details: Foo is amazing
  - title: Bar
    details: Better still
  - title: Baz
    details: mind blown!

footer: <%= organization %> | Copyright © <%= year %> to present
---
```