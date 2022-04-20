# Node Express Typescript Boilerplate

## Todo List:

- [ ] Adjust module alias

## Installation

To install the application for development porpouses run the following command:

```shell
npm i
```

## Running the application

The application runs inside docker containers. To run the application use the following command:

```shell
docker-compose up -d
```

## Running Automated Tests

to run tests inside docker container

```shell
docker exec -it <containerhash> /bin/bash
```

once inside container:

```shell
npm test
```

## Commit messages

Types: [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]
