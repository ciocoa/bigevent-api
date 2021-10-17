import { readFile, writeFile } from 'fs'
import { join } from 'path'

// 正则表达式 提取分组的内容 即小括号里的
const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/

console.log(process.cwd())

readFile(join(process.cwd(), 'test/clock.html'), 'utf8', (err, data) => {
  if (err) return console.log(err.message)
  resolveHTML(data)
  resolveCSS(data)
  resolveJS(data)
})

/**
 * 处理 HTML 内容
 * @param {string} params 读取文件的内容
 */
function resolveHTML(params) {
  const newHTML = params
    .replace(regStyle, '<link rel="stylesheet" href="index.css">')
    .replace(regScript, '<script src="index.js"></script>')
  writeFile(join(process.cwd(), 'test/public/index.html'), newHTML, err => {
    if (err) return console.log(err.message)
    console.log('成功写入index.html')
  })
}

/**
 * 处理 CSS 内容
 * @param {string} params 读取文件的内容
 */
function resolveCSS(params) {
  // 使用正则提取需要的内容
  // 提取出来的是一个数组, 索引号为 1 的即为正则分组里的内容
  const css = regStyle.exec(params)
  // const newCSS = css[0].replace("<style>", "").replace("</style>", "");
  const newCSS = css[1]
  writeFile(join(process.cwd(), 'test/public/index.css'), newCSS, err => {
    if (err) return console.log(err.message)
    console.log('成功写入index.css')
  })
}

/**
 * 处理 JS 内容
 * @param {string} params 读取文件的内容
 */
function resolveJS(params) {
  const js = regScript.exec(params)
  const newJS = js[1]
  writeFile(join(process.cwd(), 'test/public/index.js'), newJS, err => {
    if (err) return console.log(err.message)
    console.log('成功写入index.js')
  })
}
