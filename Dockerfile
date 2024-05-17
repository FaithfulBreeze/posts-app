FROM node:latest
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 3040:3040
CMD ["npm", "start"]
