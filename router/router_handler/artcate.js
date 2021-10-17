import { dbCfg } from '../../config/cfg.js'

// 获取文章分类列表的处理函数
const getArtcates = (req, res) => {
  const sql = `select * from ev_article_cate where is_delete = 0 order by id asc`
  dbCfg.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章分类列表成功！',
      data: results
    })
  })
}

// 新增文章分类的处理函数
const addArtcate = (req, res) => {
  const sql = `select * from ev_article_cate where name = ? or alias = ?`
  dbCfg.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')
    if (
      results.length === 1 &&
      results[0].name === req.body.name &&
      results[0].alias === req.body.alias
    )
      return res.cc('分类名称与分类别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc('分类别名被占用，请更换后重试！')
    const sql = `insert into ev_article_cate set ?`
    dbCfg.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
      res.cc('新增文章分类成功！', 0)
    })
  })
}

// 删除文章分类的处理函数
const delArtcate = (req, res) => {
  const sql = `update ev_article_cate set is_delete = 1 where id = ?`
  dbCfg.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    res.cc('删除文章分类成功！', 0)
  })
}

// 获取文章分类的处理函数
const getArtcate = (req, res) => {
  const sql = `select * from ev_article_cate where id = ?`
  dbCfg.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取文章分类失败！')
    res.send({
      status: 0,
      message: '获取文章分类成功！',
      data: results[0]
    })
  })
}

// 更新文章分类的处理函数
const updateArtcate = (req, res) => {
  const sql = `select * from ev_article_cate where Id != ? and (name = ? or alias = ?)`
  dbCfg.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')
    if (
      results.length === 1 &&
      results[0].name === req.body.name &&
      results[0].alias === req.body.alias
    )
      return res.cc('分类名称与分类别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc('分类别名被占用，请更换后重试！')
    const sql = `update ev_article_cate set ? where Id = ?`
    dbCfg.query(sql, [req.body, req.body.Id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
      res.cc('更新文章分类成功！', 0)
    })
  })
}

export { getArtcates, addArtcate, delArtcate, getArtcate, updateArtcate }
