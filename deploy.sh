#!/bin/bash
set -e

# image name
IMAGE_NAME="voltz"

echo "Building Docker image: $IMAGE_NAME..."
# Dockerfile is in root, context is root. Dockerfile copies from frontend/
docker build -t $IMAGE_NAME .

echo "Starting container on port 8080..."
echo "Access the application at http://localhost:8080"
docker run -p 8080:80 --rm --name voltz-instance $IMAGE_NAME
