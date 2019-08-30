FROM node:latest
COPY . .
RUN npm install --silent --production
EXPOSE 5000
CMD "npm run dev"