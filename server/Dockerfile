FROM node:11 as server-build
WORKDIR /server
COPY . ./
RUN yarn && yarn build

FROM node:alpine
WORKDIR /server
COPY --from=server-build /server/build ./server
EXPOSE 9000
CMD ["node", "./server/index.js"]
