import joi from 'joi'
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 值的最小长度
 * max(length) 值的最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 * joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
 * not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
 * concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
 */

// 定义验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()
const id = joi.number().integer().min(1).required
const nickname = joi.string().required
const user_email = joi.string().email().required
const avatar = joi.string().dataUri().required

// 注册和登录表单的规则对象
const reg_login_schema = {
  body: {
    username,
    password
  }
}

// 更新用户基本信息的规则对象
const update_info_schema = {
  body: {
    id,
    nickname,
    email: user_email
  }
}

// 更新密码的规则对象
const update_pwd_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}

// 更新头像的规则对象
const update_avatar_schema = {
  body: {
    avatar
  }
}

export { reg_login_schema, update_info_schema, update_pwd_schema, update_avatar_schema }
