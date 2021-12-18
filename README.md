## About the project

This monorepository includes [Ditsmod](https://github.com/ditsmod/ditsmod) applications seed.

All packages are located in `packages/*` and are serviced by [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/).

So you need to do:

```bash
yarn install
yarn boot # This command actually call "lerna bootstrap"
```

If you want to add, for example, an Angular application, you can do this:

```bash
npm install -g @angular/cli
ng new packages/my-angular-application
```

## Website

In `website` directory located [docusaurus](https://github.com/facebook/docusaurus) application that you can use to publish documentation for your monorepo.

If you need this, you can:

```bash
cd website
yarn install
yarn start
```
