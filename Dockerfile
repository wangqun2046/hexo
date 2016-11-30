FROM node:boron-alpine

MAINTAINER Wang Qun, <qun.wang@live.cn>

WORKDIR /Hexo

RUN \
  apk add --no-cache git openssl \
  && npm install hexo-cli -g \
  && hexo init . \
  && npm install \
  && npm install hexo-generator-sitemap --save \
  && npm install hexo-generator-feed --save \
  && npm install hexo-generator-searchdb --save \
  && npm install hexo-deployer-git --save 

VOLUME ["/Hexo/source", "/Hexo/themes", "/root/.ssh"]

EXPOSE 80

COPY docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ['/bin/bash']
