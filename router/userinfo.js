import express from 'express'
import expressJoi from '@escook/express-joi'
import { getInfo, updateInfo, updatePwd, updateAvatar } from './router_handler/userinfo.js'
import { update_info_schema, update_avatar_schema, update_pwd_schema } from '../schema/user.js'

const infoRouter = express.Router()

// 获取用户基本信息的路由
infoRouter.get('/userinfo', getInfo)

// 更新用户基本信息的路由
infoRouter.post('/update/info', expressJoi(update_info_schema), updateInfo)

// 更新用户密码的路由
infoRouter.post('/update/pwd', expressJoi(update_pwd_schema), updatePwd)

// 更新用户头像的路由
infoRouter.post('/update/avatar', expressJoi(update_avatar_schema), updateAvatar)

export { infoRouter }
