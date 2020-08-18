# pull official base image
FROM node:13.12.0-alpine


# needed to build gpy'd dependencies
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++


RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN mkdir /bin/www
WORKDIR /bin/www
COPY package.json ./
COPY package-lock.json ./
RUN chown -R node:node /bin/www

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
USER node
RUN npm install


#add app
COPY . ./

# let's fly
CMD [ "npm", "start" ]
