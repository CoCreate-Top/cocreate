# Cocreate

CoCreate is the ultimate platform for turning solo ambitions into collaborative triumphs. Connect with like-minded individuals, share your project vision, and find the perfect team to bring your ideas to life. 

## Requirements
Each part of platform has it's own requirements but if you want to use docker you will need:
- [Docker](https://www.docker.com)

## Docker explained

This repository is a collection of 3 Docker containers that can be used to run the Cocreate platform.

1. *angular*
2. *node*
3. *postgres*

If you want to run all containers in Docker, you can use the `docker-compose.yml` file. You can run this with:
```
docker compose up
```

If you want to develop on the frontend side, you can just run the backend containers (*node* and *postgres*) with:
```
docker compose --file compose.backend.yml up
```

If you want to develop on the backend side, you can run the *postgres* container with:
```
docker compose --file compose.database.yml up
```

## Postgres container
If the *postgres* container is running, you can connect to it with API server od other database tools (I recommend Beekeeper Studio)

Database informations are found in `.env` file. They can be changed there too.

The database should be persistent (it should save in `cocreate-database/`), but I don't exactly know how will it work with git. If this will be a problem, we will need to host a database on another server and connect it with API server.