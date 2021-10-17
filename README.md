# bigevent-api

## 说明

- 小白，纯属练手
- Express ES6

### API 接口说明

##### 数据库

my_db_01.sql 包含基本 sql 指令，快速创建大事件项目数据库基本框架

##### 入口文件

app.js ，启动服务器

注：凡以`/my`开头的请求路径都需携带 `Authorization : Token` 身份认证

##### 用户模块：http://localhost:port/api

- 注册：/reguser **POST**
  - req：username password
  - res：status message
- 登录：/login **POST**
  - req：username password
  - res：status message token

##### 用户信息：http://localhost:port/my

- 获取基本信息：/userinfo **GET**
  - req：需添加 Authorization : Token 请求头
  - res：status message data { id, username, nickname, email, user_pic }
- 更新基本信息：/update/info **POST**
  - req：id nickname email
  - res：status message
- 更新用户密码：/update/pwd **POST**
  - req：oldPwd newPwd
  - res：status message
- 更新用户头像：/update/avatar **POST**
  - req：avatar
  - res：status message

##### 文章分类：http://localhost:port/my/art

- 获取分类列表：/cates **GET**
  - req：需添加 Authorization : Token 请求头
  - res：status message data { Id, name, alias, is_delete }
- 新增文章分类：/addcate **POST**
  - req：name alias
  - res：status message
- 删除文章分类：/delcate/:id **GET**
  - req：id
  - res：status message
- 获取文章分类：/getcate/:id **GET**
  - req：id
  - res：status message data { Id, name, alias, is_delete }
- 更新文章分类：/updatecate **POST**
  - req：Id name alias
  - res：status message

##### 文章管理：http://localhost:port/my/art

- 发布文章：/addart **POST**
  - req（FormData 格式）：title cate_id content cover_img state
  - res：status message
- 获取列表：/arts **GET**
  - req：pagenum pagesize cate_id state
  - res：status message data { Id, title, pub_date, state, cate_name }
- 删除文章：/delart/:id **GET**
  - req：id
  - res：status message
- 获取文章：/getart/:id **GET**
  - req：id
  - res：status message data { Id, title, content, cover_img, pub_date, state, is_delete, cate_id, author_id }
- 更新文章：
  - req（FormData 格式）：Id title cate_id content cover_img state
  - res：status message

待续......
