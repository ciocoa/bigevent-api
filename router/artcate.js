import express from 'express'
import expressJoi from '@escook/express-joi'
import {
  addArtcate,
  delArtcate,
  getArtcate,
  getArtcates,
  updateArtcate
} from './router_handler/artcate.js'
import {
  add_cate_schema,
  del_cate_schema,
  get_cate_schema,
  update_cate_schema
} from '../schema/artcate.js'

const artcateRouter = express.Router()

// 获取文章分类列表的路由
artcateRouter.get('/cates', getArtcates)

// 新增文章分类的路由
artcateRouter.post('/addcate', expressJoi(add_cate_schema), addArtcate)

// 删除文章分类的路由
artcateRouter.get('/delcate/:id', expressJoi(del_cate_schema), delArtcate)

// 获取文章分类的路由
artcateRouter.get('/getcate/:id', expressJoi(get_cate_schema), getArtcate)

// 更新文章分类的路由
artcateRouter.post('/updatecate', expressJoi(update_cate_schema), updateArtcate)

export { artcateRouter }
