# Cocreate

CoCreate is the ultimate platform for turning solo ambitions into collaborative triumphs. Connect with like-minded individuals, share your project vision, and find the perfect team to bring your ideas to life. 

## Requirements
Each part of platform has it's own requirements but if you want to deploy with docker you will only need [Docker](https://www.docker.com). If you want to run API server or Angular frontend, you need [node](https://nodejs.org/en).

## Docker explained

This repository is a collection of 2 Docker containers that can be used to run the Cocreate platform.

1. *angular*
2. *node*

If you want to run all containers in Docker, you can use the `docker-compose.yml` file. You can run this with:
```
docker compose up
```

If you want to develop on the frontend side, you can just run the backend containers (*node*) with:
```
docker compose --file compose.backend.yml up
```
