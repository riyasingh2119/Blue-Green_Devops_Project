#!/bin/bash

ENV=$1

if [ "$ENV" == "blue" ]; then
  echo "Switching to BLUE"
  docker-compose -f docker/docker-compose.blue.yml up -d

elif [ "$ENV" == "green" ]; then
  echo "Switching to GREEN"
  docker-compose -f docker/docker-compose.green.yml up -d

else
  echo "Invalid environment"
fi