import { createPool } from 'mysql'

const dbCfg = createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'my_db_01'
})

const tokenCfg = {
  jwtSecretKey: 'itheima No1. ^_^', // 加密和解密 Token 的秘钥
  expiresIn: '10h' // token 的有效期
}

export { dbCfg, tokenCfg }
