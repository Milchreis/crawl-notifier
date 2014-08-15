FROM dockerfile/nodejs
MAINTAINER Johannes Schickling "schickling.j@gmail.com"

ADD index.js /data/index.js
ADD package.json /data/package.json

RUN cd /data && npm install

VOLUME ["/data/crawlers"]

CMD ["node", "/data/index.js"]
