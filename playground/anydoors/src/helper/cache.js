const { cache } = require('../config/defaultConfig')

function refreshRes(stats, res){
    if(cache.expires){
        res.setHeader('Expires', (new Date(Date.now() + cache.maxAge*1000)).toUTCString())
    }

    if(cache.cacheControl){
        res.setHeader('Cache-Control', `public, max-age=${cache.maxAge}`)
    }

    if(cache.lastModified){
        res.setHeader('Last-Modified', stats.mtime.toUTCString())
    }

    if(cache.etag){
        console.info(`${stats.size}-${stats.mtime}`)
        res.setHeader('ETag', `${stats.size}-${stats.mtime}`)
    }    
}

module.exports = (stats, req, res) => {
    refreshRes(stats, res)

    const lastModified = req.headers['if-modified-since']
    const etag = req.headers['if-none-match']

    if(!lastModified && !etag){
        return false
    }

    if(lastModified && lastModified !== res.getHeader('Last-Modified')){
        return false
    }

    if(etag && etag !== res.getHeader('ETag')){
        return false
    }

    return true
}