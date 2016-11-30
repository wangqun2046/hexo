#!/bin/sh

echo "$@" | awk -F ' ' '{print $1}' | xargs git config --global user.name

echo "$@" | awk -F ' ' '{print $2}' | xargs git config --global user.email

if [ "$3" = 's' ] || [ "$3" = 'server' ]; then
    set -- /usr/bin/env hexo s -p 80
elif [ "$3" = 'd' ] || [ "$3" = 'deploy' ]; then
    set -- /usr/bin/env hexo cl && /usr/bin/env hexo d -g
fi

exec "$@"
