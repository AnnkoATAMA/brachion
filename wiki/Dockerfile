FROM node:20-alpine

WORKDIR /wiki

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--port", "5174", "--host", "0.0.0.0"]