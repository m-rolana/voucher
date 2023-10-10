Documentation
```
apidoc/index.html
```
or
```
https://github.com/m-rolana/voucher/blob/main/apidoc/index.html
```

## Run
```bash
docker-compose -f ./docker-compose.local.yml up -d # run DB

yarn install
yarn dev # or yarn build && yarn start in production
```
or you can run everything in docker containers
```bash
./run.sh # don't forget about executable rights
```

## Testing
```bash
yarn start-test-server
yarn test
```