FROM node:17.0.1

WORKDIR /blog_app

COPY app.js package.json dynamodb.js views/ utils/ ./

RUN mkdir utils && mv library.js utils && mkdir views && mv layouts blogs.handlebars home.handlebars post.handlebars blog.handlebars views

RUN npm install

EXPOSE 9090

CMD ["node", "app.js"]

