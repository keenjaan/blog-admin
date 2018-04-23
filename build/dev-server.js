const config					= require('../config');
const path						= require('path');
const express					= require('express');
const webpack					= require('webpack');
const webpackConfig		= require('./webpack.dev.conf');
const opn							= require('opn');
const proxyMiddleware	= require('http-proxy-middleware');

const autoOpenBrowser	= !!config.dev.autoOpenBrowser;
const proxyTable			= config.dev.proxyTable;
// 环境变量
if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = config.dev.env.NODE_ENV;
}

// 端口号
const port = process.env.PORT || config.dev.port;

// express
const app = express();
const compiler = webpack(webpackConfig);
const devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
});

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
});

app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);
app.use(hotMiddleware);

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

app.use(staticPath, express.static('./dist'))

const uri = 'http://localhost:' + port;

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})

app.listen(port, function (err) {
	if (err) {
		console.log(err);
	}
})