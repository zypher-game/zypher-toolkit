/* eslint-disable @typescript-eslint/no-var-requires */
const env = require('dotenv')
const fs = require('fs')
const path = require('path')
const res = env.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)
})
const base_res = env.config({ path: path.join(__dirname, `../.env.base`) })
const str = `
window.env = '${res.parsed.env}';
window.isGames = ${res.parsed.isGames};
export const env = '${res.parsed.env}';
export const BASE_URL = '${base_res.parsed.BASE_URL ?? ''}'
`
const strStyl = `
$preStaticUrl = 'https://static${res.parsed.env === 'develop' ? '-dev' : ''}.zypher.game'
`
fs.writeFileSync(path.join(__dirname, '../src/utils/config.ts'), str)
fs.writeFileSync(path.join(__dirname, '../src/assets/stylus/lib/env.styl'), strStyl)
