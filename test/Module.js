import moment from 'moment'

console.log(moment().format('YYYY-MM-DD'))

// ES6 中无法使用 __dirname
// import.meta.url 当前文件路径属性
console.log(import.meta.url)
console.log('public/index.html', new URL(import.meta.url).pathname)

// process.cwd() 项目根路径
console.log(process.cwd())
