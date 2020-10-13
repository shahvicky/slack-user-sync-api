ARG REPO="slack-user-sync-api"

# take default image of node i.e  node 12.x
FROM node:12

ARG REPO
WORKDIR /opt/app

# Copy the repo and build
COPY . /opt/app
RUN npm ci

WORKDIR /opt/app

# expose port 8000
EXPOSE 8000

CMD ["node", "index.js"]
