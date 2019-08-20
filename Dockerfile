FROM node:10.16.3

# create and set app directory
RUN mkdir -p /usr/src/ehr/
WORKDIR /usr/src/ehr/

# install app dependencies
COPY package.json /usr/src/ehr
RUN npm install

# Copy app source
COPY . /usr/src/ehr

# Create self-signed certificates
RUN chmod +x ./create-self-signed-certs.sh
RUN ./create-self-signed-certs.sh

# Build app
RUN npm run build

EXPOSE 5000
EXPOSE 5001

CMD ["npm", "start"]
