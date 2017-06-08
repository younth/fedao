## fedao数据模拟中心

数据mock主要分为前端接口的mock（client request）及向后请求的数据mock(server request)。
其中，前端接口mock表现为 ajax请求。向后请求Mock主要是指nodeui向后请求php接口的mock，这种数据一般用来渲染到模板或者直接接口输出。

所有的mock均支持热重启，即修改代码不需要重启nodeui，立即生效。

### 目录规范

```
mock
  ├─ server.conf // 配置中心  
  ├─ common   // 公共接口目录
  │  ├─ dynamic.js  // 动态数据
  │  ├─ sample.json  // 静态json数据
  ├─ ral // nodeui向php请求接口模拟
  │  ├─ hongbao-getmobilebyopenid.js // 微信授权根据openid获取用户信息接口  
  │  ├─ hongbao-updatemobilebyopenid.js // 更新用户信息接口  
  │  ├─ huodong-2016usergrowstoryindex.js // 业务php接口模拟  
  ├─ dumall // 业务接口
  │  ├─ center.js // 小度商城个人中心
  │  ├─ del.json // 删除卡片接口
  ...
```

### 如何使用

前端接口的mock主要在`server.conf`里面进行配置
    
### server.conf 配置语法

    指令名称 正则规则 目标文件
    
- `指令名称` 支持 rewrite 、 redirect 和 proxy。
- `正则规则` 用来命中需要作假的请求路径
- `目标文件` 设置转发的目标地址，需要配置一个可请求的 url 地址。

### mock 静态假数据


```
rewrite ^\/api\/user$ /mock/sample.json

// sample.json内容

{
    "error": 0,
    "message": "ok",
    "data": {
        "username": "younth",
        "uid": 1,
        "age": 25,
        "company": "waimai"
    }
}
```

### mock 动态假数据

> node 服务器可以通过 js 的方式提供动态假数据。，动态数据本质是 express 的 route.


```
rewrite ^\/api\/dynamic\/time$ /mock/dynamic.js

// dynamic.js内容

module.exports = function(req, res, next) {

  res.write('Hello world ');

  // set custom header.
  // res.setHeader('xxxx', 'xxx');

  res.end('The time is ' + Date.now());
};

// 更复杂的，可以直接引用其他模块，发送请求


var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');

// 通过nodejs来抓取线上的结果。这样就完成了动态获取线上数据的功能

module.exports = function(request, response, next) {

    var method = request.method;
    ...

};

```

### proxy 到其他服务的 api 地址

    // 支持正则分组
    proxy ^\/wmall\/privilege\/(.*)$  http://10.19.161.92:8059/wmall/privilege/$1

  ## 测试链接

- ral请求mock: http://127.0.0.1:8197/fly/h5/demo
- 普通请求mock(rewrite): http://127.0.0.1:8197/api/user
- 动态数据mock(rewrite): http://127.0.0.1:8197/api/dynamic/time
- api proxy mock: http://127.0.0.1:8197/wmall/privilege/center
- 重定向(redirect): http://127.0.0.1:8197/api/redirect
