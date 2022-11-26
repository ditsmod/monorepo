## About the project

This monorepository includes [Ditsmod](https://ditsmod.github.io/en/) applications seed.

All packages are located in `packages/*` and are serviced by [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/).

From start you need to do:

```bash
yarn install
yarn boot # This command actually call "lerna bootstrap"
```

After that, copy `packages/server/.env-example` to `packages/server/.env`:

```bash
cp packages/server/.env-example packages/server/.env
```

And fill this file.

## Start the web server in develop mode

```bash
yarn start
```

After this, see OpenAPI docs on [http://localhost:3000/api/openapi](http://localhost:3000/api/openapi)

## Start the web server in production mode

```bash
yarn build
yarn start-prod
```

## Extends the projects

Since this monorepo is served by yarn, it is necessary that any npm packages install via yarn.

If you want to add, for example, an Angular application, You can set yarn by default for angular-cli:

```bash
npm i -g add @angular/cli
ng config -g cli.packageManager yarn
```

Then you can do this:

```bash
cd packages
ng new my-angular-application --routing
```

For some reason, a bug of yarn appears after this command. If you open [http://localhost:3000/api/openapi](http://localhost:3000/api/openapi) you will see this bug. To avoid it, it is necessary delete `yarn.lock` and rebootstrap the monorepo:

```bash
yarn boot
```

Then open `packages/<your-project-name>/angular.json` and fix `$schema`:

```json
// ...
"$schema": "../../node_modules/@angular/cli/lib/config/schema.json",
// ...
```
