const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const { promisify } = require('util')
const conf = require('../config/defaultConfig')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
// __dirname 当前文件的绝对路径
const tplPath = path.join(__dirname, '../template/dir.html')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())

module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            fs.createReadStream(filePath).pipe(res)
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            const dir = path.relative(conf.root, filePath)
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files
            }
            res.end(template(data))
        }
    } catch (error) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end(`${filePath} is not a directory or file`)
    }
}