FROM node:20.9

ARG port=8000

WORKDIR /app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .
RUN npm run swagger
RUN npx tsc

EXPOSE ${port}

# CMD npm start
CMD node ./build/index.js
