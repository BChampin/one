# pull the Node.js Docker image
FROM node:21-alpine3.18

# create the directory inside the container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY dist/index.js .

# our app is running on port 3000 within the container, so need to expose it
EXPOSE 3000

# the command that starts our app
CMD ["node", "index.js"]
