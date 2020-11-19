FROM node:14-alpine
RUN apk --no-cache add bash curl grep tzdata

# create and set app directory
RUN mkdir -p /usr/src/ehr/
WORKDIR /usr/src/ehr/

# install app dependencies
COPY package.json /usr/src/ehr
RUN npm install

# Copy app source
COPY . /usr/src/ehr

# Build app
RUN npm run build

EXPOSE 5000
EXPOSE 5001

CMD ["npm", "start"]
