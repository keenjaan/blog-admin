const path = require('path');

module.exports = {
	dev: {
		env: require('./dev.env'),
		port: 8888,
		cssSourceMap: false,
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'build',
    assetsPublicPath: '/',
		autoOpenBrowser: true,
		proxyTable: {}
	},
  build: {
    env: require('./prod.env'),
	assetsPublicPath: '/',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'build',
    index: path.resolve(__dirname, '../dist/index.html')
  }
}