let path = require('path')
let CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    productionSourceMap: false,
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    },

    devServer: {
        proxy: {
            '/ws': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                ws: true
            },
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin({
                patterns: [{
                    from: 'node_modules/mavon-editor/dist/highlightjs',
                    to: path.resolve(__dirname, 'dist/plugins/highlightjs'), // 插件将会把文件导出于/dist/highlightjs之下
                }, {
                    from: 'node_modules/mavon-editor/dist/markdown',
                    to: path.resolve(__dirname, 'dist/plugins/markdown'), // 插件将会把文件导出于/dist/markdown之下
                }, {
                    from: 'node_modules/mavon-editor/dist/katex', // 插件将会把文件导出
                    to: path.resolve(__dirname, 'dist/plugins/katex')
                }]
            })
        ]
    }
}
