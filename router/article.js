import express from 'express'
import multer from 'multer'
import expressJoi from '@escook/express-joi'
import { addArticle } from './router_handler/article.js'
import { add_article_schema } from '../schema/article.js'

/**
 * 使用 express.urlencoded() 中间件无法解析 multipart/form-data 格式的请求体数据。
 * 此时使用 multer 来解析 multipart/form-data 格式的请求体数据。
 */

const articleRouter = express.Router()

const upload = multer({
  // import { join } from "path";
  // dest: join(process.cwd(), "uploads"),
  dest: new URL('../uploads', import.meta.url).pathname
})

// 发布文章的路由
articleRouter.post(
  '/addart',
  upload.single('cover_img'),
  expressJoi(add_article_schema),
  addArticle
)

export { articleRouter }
