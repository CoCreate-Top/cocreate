FROM node:20.9

ARG port=8000

WORKDIR /app
ENV NODE_PORT ${{ secrets.NODE_PORT }}
ENV DB_PASSWORD ${{ secrets.DB_PASSWORD }}
ENV DB_HOST ${{ secrets.DB_HOST }}
ENV DB_PORT ${{ secrets.DB_PORT }}
ENV DB_USER ${{ secrets.DB_USER }}
ENV DB_NAME ${{ secrets.DB_NAME }}
ENV ACCESS_TOKEN_SECRET ${{ secrets.ACCESS_TOKEN_SECRET }}
ENV SALT_ROUNDS ${{ secrets.SALT_ROUNDS }}
ENV GOOGLE_CLIENT_ID ${{ secrets.GOOGLE_CLIENT_ID }}
ENV GOOGLE_CLIENT_SECRET ${{ secrets.GOOGLE_CLIENT_SECRET }}
ENV GOOGLE_OAUTH_REDIRECT_URL ${{ secrets.GOOGLE_OAUTH_REDIRECT_URL }}
ENV ORIGIN_URL ${{ secrets.ORIGIN_URL }}

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .
RUN npm run swagger
RUN npx tsc

EXPOSE ${port}

# CMD npm start
CMD node ./build/index.js
