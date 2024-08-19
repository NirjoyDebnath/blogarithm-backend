FROM node:20

WORKDIR /app

COPY /src /app/src
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY /tsconfig.json /app/tsconfig.json

RUN npm i

RUN npm run build

CMD ["npm", "start"]