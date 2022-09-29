# ✨ Backend Challenge ✨

## Route

> GET /files/data

> GET /files/data?filename={{param}}

> GET /files/list

## How to run it?

- Install dependencies with

  `yarn`

  or

  `npm install`

- then run the project with

  `yarn dev`

## How do I run the tests?

- With the dependencies installed run

  `yarn test`

  or

  `npm test`

## Is there support for docker?

- Of course. Build the image with

  `docker build . -t cc25mc/backend-challenge`

- and then

  `docker run -p 4000:4000 -d cc25mc/backend-challenge`
