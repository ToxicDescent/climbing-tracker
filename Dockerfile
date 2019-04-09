FROM node:11 as react-build
WORKDIR /usr/src/app/
COPY . ./
RUN yarn && yarn build:client

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
