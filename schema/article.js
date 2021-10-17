import joi from 'joi'

// 定义验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

// 发布文章的规则对象
const add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state
  }
}

export { add_article_schema }
