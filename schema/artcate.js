import joi from 'joi'

// 定义验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

// 新增文章分类的规则对象
const add_cate_schema = {
  body: {
    name,
    alias
  }
}

// 删除文章分类的规则对象
const del_cate_schema = {
  params: {
    id
  }
}

// 获取文章分类的规则对象
const get_cate_schema = {
  params: {
    id
  }
}

// 更新文章分类的规则对象
const update_cate_schema = {
  body: {
    name,
    alias,
    Id: id
  }
}

export { add_cate_schema, del_cate_schema, get_cate_schema, update_cate_schema }
