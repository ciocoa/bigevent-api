# BigEventServer

#### 介绍

**这是一个练习仓库，对应 BigEvent 项目的服务器端。**

#### 架构

使用 ES6 模块，Express，等练习开发大事件项目服务器 API

#### API 接口说明

##### 数据库

my_db_01.sql 包含基本 sql 指令，快速创建大事件项目数据库基本框架

##### 入口文件

app.js ，启动服务器

注：凡以`/my`开头的请求路径都需携带 `Authorization : Token` 身份认证

##### 用户模块：http://localhost:port/api

- 注册：/reguser **POST**
  - 请求参数：username password
  - 返回参数：status message
- 登录：/login **POST**
  - 请求参数：username password
  - 返回参数：status message token

##### 用户信息：http://localhost:port/my

- 获取基本信息：/userinfo **GET**
  - 请求参数：需添加 Authorization : Token 请求头
  - 返回参数：status message data { id, username, nickname, email, user_pic }
- 更新基本信息：/update/info **POST**
  - 请求参数：id nickname email
  - 返回参数：status message
- 更新用户密码：/update/pwd **POST**
  - 请求参数：oldPwd newPwd
  - 返回参数：status message
- 更新用户头像：/update/avatar **POST**
  - 请求参数：avatar
  - 返回参数：status message

##### 文章分类：http://localhost:port/my/art

- 获取分类列表：/cates **GET**
  - 请求参数：需添加 Authorization : Token 请求头
  - 返回参数：status message data { Id, name, alias, is_delete }
- 新增文章分类：/addcate **POST**
  - 请求参数：name alias
  - 返回参数：status message
- 删除文章分类：/delcate/:id **GET**
  - 请求参数：id
  - 返回参数：status message
- 获取文章分类：/getcate/:id **GET**
  - 请求参数：id
  - 返回参数：status message data { Id, name, alias, is_delete }
- 更新文章分类：/updatecate **POST**
  - 请求参数：Id name alias
  - 返回参数：status message

##### 文章管理：http://localhost:port/my/art

- 发布文章：/addart **POST**
  - 请求参数（FormData 格式）：title cate_id content cover_img state
  - 返回参数：status message
- 获取列表：/arts **GET**
  - 请求参数：pagenum pagesize cate_id state
  - 返回参数：status message data { Id, title, pub_date, state, cate_name }
- 删除文章：/delart/:id **GET**
  - 请求参数：id
  - 返回参数：status message
- 获取文章：/getart/:id **GET**
  - 请求参数：id
  - 返回参数：status message data { Id, title, content, cover_img, pub_date, state, is_delete, cate_id, author_id }
- 更新文章：
  - 请求参数（FormData 格式）：Id title cate_id content cover_img state
  - 返回参数：status message

待续......
