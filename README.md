# slack-user-sync-api #

Handle internal APIs from web and webhooks from slack app

## Getting started ##

Clone the repo:

```
git clone https://github.com/shahvicky/slack-user-sync-api.git
cd slack-user-sync-api
```

Install dependencies
```
npm install
```


## Setup ##

To run the app locally, you need to have [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed.

Have a local setup ready by running:
```
npm run setup:up
```
This starts the dependencies (only MySQL for now) locally in docker container

To stop and remove containers created by `npm run setup:up`, by running:
```
npm run setup:down
```

Start Server:
```
node index.js
```

## Environment Variables ##

Please see [doc/env.md](doc/env.md) for the possible environment variables.

Along with the above, to run in production, you need `NODE_ENV=production` and a `.env` file inside `tools/` dir.
For local, environment variables from `local.env` inside `tools/` is used

## Tests ##

### Tests in docker

```
npm run test:integration
```
### Local tests ###

*This is much faster while you are writing tests*

First, start up the local env by above setup.
The test a single file by:
```
node <path to test file>
node test/endpoint/health-check.js
```
To run the entire test suite:
```
npm run test
```
To include a HTML coverage report, you can run the following:
```
open coverage/lcov-report/index.html
```

## Packages

- [@logdna/env-config](https://github.com/logdna/env-config-node) - Node.js Package to define, document, and assert environment variables
- [eslint-config-logdna](https://github.com/logdna/eslint-config-logdna) - This package contains the eslint configuration
- [pino](https://github.com/pinojs/pino) - Node.js logger
- [express](https://github.com/expressjs/express) - Web framework
- [@slack/web-api](https://github.com/SlackAPI/node-slack-sdk) - Client for making requests to Slack’s Web API


## License

SEE LICENSE IN LICENSE