const HtmlWebpackPlugin = require('html-webpack-plugin')
let BASE_URL = '/'
if (process.env.CDN_BASE_URL) {
    BASE_URL = process.env.CDN_BASE_URL
}

module.exports = {
    publicPath: BASE_URL,
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
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true
            }
        }
    },

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false
        }
    },
    configureWebpack: {
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './public/index.html',
                favicon: './public/favicon.ico', // 添加小图标
                inject: true
            })
        ]
    }

}
