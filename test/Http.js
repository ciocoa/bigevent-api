import { readFile } from 'fs'
import { createServer } from 'http'
import { join } from 'path'

const server = createServer()

server.on('request', (req, res) => {
  // 客户端请求的 url 地址 -- req.url
  const url = req.url
  // 拼接 url 地址
  let fpath = ''
  if (url === '/') fpath = join(process.cwd(), 'test/public/index.html')
  else fpath = join(process.cwd(), 'test/public', url)

  // 读取文件内容
  readFile(fpath, 'utf8', (err, data) => {
    // 响应对象 res
    // 设置相应头 (防止中文等乱码)
    // res.setHeader("Content-Type", "text/html; charset=utf8");
    if (err) return res.end('404 not found!')
    res.end(data)
    // 客户端请求的 method 类型 -- req.method
    console.log(`请求的地址为: ${url}, 拼接的地址是: ${fpath} 请求类型是: ${req.method}`)
  })
})

server.listen(3008, () => {
  console.log('server running at http://127.0.0.1:3008')
})
