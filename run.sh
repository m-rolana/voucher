#!/bin/bash

docker-compose build api
docker-compose down
docker-compose up -d
docker-compose ps