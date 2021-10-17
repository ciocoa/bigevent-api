import { join } from 'path'
import { dbCfg } from '../../config/cfg.js'

// 发布文章的处理函数
const addArticle = (req, res) => {
  console.log(req.file) // 文件类型的数据
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
  const articleInfo = {
    ...req.body,
    cover_img: join('/uploads', req.file.filename), // 文章封面的存放路径
    pub_date: new Date(),
    author_id: req.user.id
  }
  const sql = `insert into ev_articles set ?`
  dbCfg.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('发布新文章失败！')
    res.cc('发布新文章成功！', 0)
  })
}

export { addArticle }
