# ddl

## dev 环境
- 本机上运行后端
- node.js 14
- vue-cli
- docker
- docker-compose

## 推荐IDE
JetBains Webstorm 最新版本

## 启动后端教程
- clone 后端代码到本地 `git clone https://github.com/wustacm/oj-frontend.git`
- 进入代码文件夹 `cd oj-frontend/`
- 启动后端，数据库等的容器 `docker-compose -f fe-dev.yaml up -d`
- 容器会占用 6379(redis), 5432(postgres), 8000(后端)端口
- 前端代码中将`vue.config.js`中的*devServer*中的IP地址改成对应的后端的IP地址即可
- 注：后端代码更新的话，如果没更新数据模型，只需要clone下代码就可以了，如果数据模型更新了的话，需要重新构建下镜像，首先执行`docker-compose -f fe-dev.yaml down`停止容器，其次执行`docker-compose -f fe-dev.yaml up -d --build`重新构建镜像

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
