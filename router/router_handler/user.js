import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import { dbCfg, tokenCfg } from '../../config/cfg.js'

// 用户注册的处理函数
const regUser = (req, res) => {
  // 接收表单数据
  const userInfo = req.body
  // 判断是否合法
  // if (!userInfo.username || !userInfo.password)
  //   return res.send({ status: 1, message: "用户名或密码不能为空！" });
  const sql = `select * from ev_users where username = ?`
  dbCfg.query(sql, [userInfo.username], (err, results) => {
    // if (err) return res.send({ status: 1, message: err.message });
    if (err) return res.cc(err)
    if (results.login > 0) return res.cc('用户名被占用，请更换其他用户名！')
    // 用户名可用时，对用户密码进行加密
    userInfo.password = bcryptjs.hashSync(userInfo.password, 10)
    const sql = `insert into ev_users set ?`
    dbCfg.query(
      sql,
      {
        username: userInfo.username,
        password: userInfo.password
      },
      (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
        res.cc('注册成功！', 0)
      }
    )
  })
}

// 用户登录的处理函数
const login = (req, res) => {
  const userInfo = req.body
  const sql = `select * from ev_users where username = ?`
  dbCfg.query(sql, userInfo.username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('用户名不存在！')
    // 判断密码是否正确
    const compareResult = bcryptjs.compareSync(userInfo.password, results[0].password)
    if (!compareResult) return res.cc('用户名或密码不正确！')
    // 生成 Token 字符串
    const user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = jsonwebtoken.sign(user, tokenCfg.jwtSecretKey, {
      expiresIn: tokenCfg.expiresIn
    })
    res.send({
      status: 0,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr
    })
  })
}

export { regUser, login }
