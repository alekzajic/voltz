#!/bin/bash
set -e

# Define image name
IMAGE_NAME="volt-app"

echo "Building Docker image: $IMAGE_NAME..."
# Dockerfile is in root, context is root. Dockerfile copies from frontend/
docker build -t $IMAGE_NAME .

echo "Starting container on port 8080..."
echo "Access the application at http://localhost:8080"
docker run -p 8080:80 --rm --name volt-app-instance $IMAGE_NAME
