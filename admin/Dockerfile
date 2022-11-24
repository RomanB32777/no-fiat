FROM node:14-alpine AS builder

WORKDIR /admin

COPY ./package.json ./

RUN npm install

COPY . .

# Args
ARG NODE_ENV

ARG WALLET

ARG STORAGE_TOKEN

# Tron
ARG TRON_CONTRACT_ADDRESS

ARG TRON_CHAIN_NAME

# Near
ARG NEAR_CONTRACT_NAME

ARG NEAR_CHAIN_NAME


# Env
ENV REACT_APP_NODE_ENV=$NODE_ENV

ENV REACT_APP_WALLET=$WALLET

ENV REACT_APP_STORAGE_TOKEN=$STORAGE_TOKEN

# Tron
ENV REACT_APP_TRON_CONTRACT_ADDRESS=$TRON_CONTRACT_ADDRESS

ENV REACT_APP_TRON_CHAIN_NAME=$TRON_CHAIN_NAME

# Near
ENV REACT_APP_NEAR_CONTRACT_NAME=$NEAR_CONTRACT_NAME

ENV REACT_APP_NEAR_CHAIN_NAME=$NEAR_CHAIN_NAME

RUN npm run build


FROM nginx:1.20.1-alpine

RUN apk --no-cache add curl

RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin

COPY ./nginx.config /etc/nginx/nginx.template

CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

COPY --from=builder /admin/build /usr/share/nginx/html
