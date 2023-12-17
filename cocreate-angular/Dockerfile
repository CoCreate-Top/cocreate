FROM node:20.9

ARG port=4200

WORKDIR /app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
RUN npm install -g @angular/cli
COPY . .

EXPOSE ${port}

# CMD npm start
CMD ng serve --host 0.0.0.0 --port ${port}
