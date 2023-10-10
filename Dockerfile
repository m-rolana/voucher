FROM node:16-alpine
COPY . /api
ENV HOST=voucher_api
ENV DB_HOST=voucher_db
ENV DB_PORT=5432
WORKDIR /api
RUN yarn install && yarn build
ENTRYPOINT [ "yarn", "start"]