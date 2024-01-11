## About the project

This monorepository includes [Ditsmod](https://ditsmod.github.io/en/) applications seed.

All packages are located in `packages/*`.

From start you need to do:

```bash
npm install
```

After that, copy `packages/server/.env-example` to `packages/server/.env`:

```bash
cp packages/server/.env-example packages/server/.env
```

And fill this file.

## Start the web server in develop mode

```bash
# From first terminal.
# This compiles TS to JS.
npm run watch

# From second terminal.
# This starts the web server and restarts when changes are made.
npm start
```

## Start the web server in production mode

```bash
npm run build
npm run start-prod
```
