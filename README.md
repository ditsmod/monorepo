## About the project

This monorepository includes [Ditsmod](https://ditsmod.github.io/en/) applications seed.

All applications are located in `apps/*`.

From start you need to do:

```bash
npm install
```

After that, copy `apps/backend/.env-example` to `apps/backend/.env`:

```bash
cp apps/backend/.env-example apps/backend/.env
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
