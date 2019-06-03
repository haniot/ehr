FROM node:10.15.3

# create and set app directory
RUN mkdir -p /usr/src/ehr/
WORKDIR /usr/src/ehr/

# install app dependencies
COPY package.json /usr/src/ehr
RUN npm install

# Bundle app source
COPY . /usr/src/ehr
RUN npm run build

EXPOSE 5000
EXPOSE 5001

CMD ["npm", "start"]