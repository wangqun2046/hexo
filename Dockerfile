FROM node:alpine

WORKDIR /Hexo

RUN \
  apk add --no-cache git openssl \
  && npm config set registry https://registry.npm.taobao.org \
  && npm install hexo-cli -g \
  && hexo init . \
  && npm install \
  && npm install hexo-generator-sitemap --save \
  && npm install hexo-generator-feed --save \
  && npm install hexo-generator-searchdb --save \
  && npm install hexo-deployer-git --save \
  && npm install hexo-renderer-markdown-it --save \
  && npm install hexo-all-minifier --save

VOLUME ["/Hexo/source", "/Hexo/themes", "/root/.ssh"]

EXPOSE 80

COPY docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ['/bin/bash']
