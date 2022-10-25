FROM node as createDev

USER node

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN yarn install

FROM node as builder

USER node

WORKDIR /app

COPY --chown=node:node --from=createDev /app/node_modules ./node_modules 
COPY --chown=node:node . .

RUN yarn build 

FROM node as production

COPY --chown=node:node --from=builder /app/node_modules ./node_modules 
COPY --chown=node:node --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/main.js" ]