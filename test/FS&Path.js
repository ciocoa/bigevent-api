import { mkdir, readFile, unlink, writeFile } from 'fs'
import { basename, extname, join } from 'path'

// path.join() 路径拼接
const path = join(process.cwd(), 'clash', 'index.js')
console.log(`拼接后的路径为: ${path}`)

// basename() 获取文件名
const fpath = new URL(import.meta.url).pathname
console.log(`文件名为: ${basename(fpath)}`)

// extname() 获取文件扩展名
console.log(`文件的扩展名为: ${extname(fpath)}`)
console.log('-------------------------------')

// fs.mkdir() 创建文件夹
mkdir(join(process.cwd(), 'test/data'), err => {
  if (err) throw err
  console.log('创建文件夹成功')
})

// writeFile() 写入文件
writeFile(
  join(process.cwd(), 'test/data/01'),
  '小红=69 小李=63 小郑=87 小兰=88 小明=73 小艾=98 小钟=99',
  err => {
    if (err) throw err
    console.log('写入文件成功')
  }
)

// readFile() 读取文件
readFile(join(process.cwd(), 'test/data/01'), 'utf8', (err, data) => {
  if (err) throw err
  console.log('读取文件成功\n' + data)

  // 处理数据
  // const arrOld = dataStr.split(" ");
  // const arrNew = [];
  // arrOld.forEach((item) => {
  //   arrNew.push(item.replace("=", ":"));
  // });
  // const newStr = arrNew.join("\r\n");

  // 使用正则表达式处理数据
  const newStr = data.replace(/=/g, ':').replace(/\s/g, '\r\n')

  writeFile(join(process.cwd(), 'test/data/02'), newStr, err => {
    if (err) throw err
    console.log('写入文件成功')
    console.log(newStr)
  })
})

// unlink() 删除文件
unlink(join(process.cwd(), 'test/data/01'), err => {
  if (err) throw err
  console.log('删除文件成功')
})
