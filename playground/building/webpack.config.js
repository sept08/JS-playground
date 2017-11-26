const path = require('path');

module.exports = {
    entry: {
        index: './src/script/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build/script')
    }
}