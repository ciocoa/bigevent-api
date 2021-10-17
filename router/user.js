import express from 'express'
import expressJoi from '@escook/express-joi'
import { login, regUser } from './router_handler/user.js'
import { reg_login_schema } from '../schema/user.js'

const userRouter = express.Router()

/**
 * 在路由中声明局部中间件 expressJoi()，对请求携带的数据进行验证
 * 验证通过，把请求流转给后面的路由处理函数，验证失败，终止后续代码执行并抛出全局 Error
 */

// 新用户注册的路由
userRouter.post('/reguser', expressJoi(reg_login_schema), regUser)

// 用户登录的路由
userRouter.post('/login', expressJoi(reg_login_schema), login)

export { userRouter }
