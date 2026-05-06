# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /commands
# Copy the rest of the application code
COPY ./getEnv.sh .
ARG assets_src
ARG assets_dest

COPY ${assets_src} ${assets_dest}


CMD [ "chmod", "+x", "./getEnv.sh" ]
