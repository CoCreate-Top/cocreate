FROM node:20.9

ARG port=8000

WORKDIR /app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
RUN npm run swagger
COPY . .
RUN npx tsc

EXPOSE ${port}

# CMD npm start
CMD node ./build/index.js