module.exports = {
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
                target: 'https://ddl.wustacm.top',
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
    }
}
