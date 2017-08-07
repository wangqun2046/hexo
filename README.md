# This is a hexo Dockerfile based on node:alpine image

## How to use it?

### Pull image

You could pull this docker image from docker hub by following command:

```shell
$ docker pull polyphylla/hexo
```

### Build from dockerfile

If you don't like get image from docker hub, and want do some test or modification in local, you could try following commands:

```shell
$ git clone git@github.com:wangqun2046/hexo.git
$ docker build . local/hexo
```

### Run container

There are two ways to use this image: one for run `hexo server` and another for `hexo deploy`. So you should run like this:

For `hexo server`, you should construct a container like this:

```shell
docker run -p ${your host port}:80 --name hexo-server -d \
	-v ${user home}/.ssh:/root/.ssh \
	-v ${your hexo log source dir}:/Hexo/source \
	-v ${your hexo log themes dir}:/Hexo/themes \
	-v ${_config.yml path in your host}:/Hexo/_config.yml \
	polyphylla/hexo ${git username} ${git email} s
```

Then you could access your hexo blog in browser by `http://localhost:${your host port}`, and you could use `docker ps` to find a **hexo-server** container has been created. It will run as demon service in background, and you could stop it as you favored So for the next time, you just need run `docker run hexo-server` to start `hexo-server` container to access  `http://localhost:${your host port}`.

For `hexo deploy`, you should construct a container like this:

```shell
docker run -p  --name hexo-deploy -d \
	-v ${user home}/.ssh:/root/.ssh \
	-v ${your hexo log source dir}:/Hexo/source \
	-v ${your hexo log themes dir}:/Hexo/themes \
	-v ${_config.yml path}:/Hexo/_config.yml \
	-v ${gulpfile.js path}:/Hexo/gulpfile.js \
	polyphylla/hexo ${git username} ${git email} d
```

This is a `hexo-deploy` container constructed, and it would exit as its job finished. When each time you have new change to deploy, just run `docker run hexo-deploy` and it would do the right deploy task.
