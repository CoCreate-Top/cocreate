# Cocreate

This is the backend of the Cocreate project.

## Requirements
Node server:
 - Node 20.9

Postgresql database:
 - PostgreSQL 16

## Instructions

1. run `npm install`

2. run `npm run dev`

> `npm run dev` will run both `tsc --watch` and `nodemon` concurrently

## Recompose instructions

1. run `docker compose down`

2. run `docker rmi $(docker image ls -aq)`

3. run `docker compose up`