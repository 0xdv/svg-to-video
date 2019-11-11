const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'svg-to-video.js',
        libraryTarget: 'umd',
        library: 'svgToVideo',
        globalObject: 'this',
    },
    optimization: {
        minimize: false
    },
}