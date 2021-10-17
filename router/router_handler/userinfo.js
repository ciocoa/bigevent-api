import bcryptjs from 'bcryptjs'
import { dbCfg } from '../../config/cfg.js'

// 获取信息的处理函数
const getInfo = (req, res) => {
  const sql = `select id, username, nickname, email, user_pic from ev_users where id = ?`
  dbCfg.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取用户信息失败！')
    res.send({
      status: 0,
      message: '获取用户基本信息成功！',
      data: results[0]
    })
  })
}

// 更新信息的处理函数
const updateInfo = (req, res) => {
  const sql = `update ev_users set ? where id = ?`
  req.body.id = req.user.id
  dbCfg.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新用户基本信息失败！')
    res.cc('更新用户基本信息成功！', 0)
  })
}

// 更新密码的处理函数
const updatePwd = (req, res) => {
  const sql = `select * from ev_users where id = ?`
  dbCfg.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('此用户不存在！')
    const compareResult = bcryptjs.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('原密码错误！')
    const sql = `update ev_users set password = ? where id = ?`
    dbCfg.query(sql, [newPwd, req.user.id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新密码错误！')
      res.cc('更新密码成功！', 0)
    })
  })
}

// 更新头像的处理函数
const updateAvatar = (req, res) => {
  const sql = `update ev_users set user_pic = ? where id = ?`
  dbCfg.query(sql, [req.body.avatar, req.body.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新头像失败！')
    res.cc('更新头像成功！', 0)
  })
}

export { getInfo, updateInfo, updatePwd, updateAvatar }
