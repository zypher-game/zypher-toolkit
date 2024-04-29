/* eslint-disable @typescript-eslint/no-var-requires */
const env = require('dotenv')
const fs = require('fs')
const path = require('path')
const res = env.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) })
const str = `
export const env = '${res.parsed.env}'
`
const strStyl = `
$preStaticUrl = 'https://static${res.parsed.env === 'develop' ? '-dev' : ''}.zypher.game'
`
fs.writeFileSync(path.join(__dirname, '../src/utils/config.ts'), str)
fs.writeFileSync(path.join(__dirname, '../src/assets/stylus/lib/env.styl'), strStyl)