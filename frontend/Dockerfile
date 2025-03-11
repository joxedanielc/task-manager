FROM node:18-alpine as build

ARG REACT_APP_API_URL
ARG REACT_APP_API_KEY

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]