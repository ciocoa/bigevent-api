import express from 'express'
import cors from 'cors'
import joi from 'joi'
import expressJWT from 'express-jwt'
import { tokenCfg } from './config/cfg.js'
import { userRouter } from './router/user.js'
import { infoRouter } from './router/userinfo.js'
import { artcateRouter } from './router/artcate.js'
import { articleRouter } from './router/article.js'

// 创建 express 的服务器实例
const app = express()

// 将 cors 注册为全局中间件
app.use(cors())

// 解析 application/x-www-form-urlencoded 中间件
app.use(express.urlencoded({ extended: false }))

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

// 相应数据的中间件封装 res.cc() 函数
app.use((req, res, next) => {
  // 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = (err, status = 1) => {
    res.send({ status, message: err instanceof Error ? err.message : err })
  }
  next()
})

// jwt 中间件
app.use(
  expressJWT({
    secret: tokenCfg.jwtSecretKey,
    algorithms: ['HS256'] // 针对新版本，需要指定 algorithms 属性
  }).unless({ path: [/^\/api/] })
)

// 注册用户路由
app.use('/api', userRouter)
// 注册信息路由
app.use('/my', infoRouter)
// 注册文章分类路由
app.use('/my/art', artcateRouter)
// 注册文章管理路由
app.use('/my/art', articleRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证失败导致的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知的错误
  res.cc(err)
})

// 调用 listen() 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})
