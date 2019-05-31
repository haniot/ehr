FROM node:10.15.3

# create and set app directory
RUN mkdir -p /usr/src/ehr/
WORKDIR /usr/src/ehr/

# install app dependencies
COPY package.json /usr/src/ehr
RUN npm install
COPY . /usr/src/ehr

EXPOSE 3000
EXPOSE 3001

ENTRYPOINT npm run build && npm start
