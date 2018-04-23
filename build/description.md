webpack.dev.conf.js中定义插件，process.env字段，其值一定是json字符串。
~~~js
new webpack.DefinePlugin({
  'process.env': config.dev.env
})
~~~

打包配置中，webpack.prod.conf.js中，CommonsChunkPlugin插件使用

比如vue-cli配置：

~~~js
entry: {
  app: './src/main.js'
}

new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: function (module, count) {
    // any required modules inside node_modules are extracted to vendor
    return (
      module.resource &&
      /\.js$/.test(module.resource) &&
      module.resource.indexOf(
        path.join(__dirname, '../node_modules')
      ) === 0
    )
  }
})
  
new webpack.optimize.CommonsChunkPlugin({
  name: 'manifest',
  chunks: ['vendor']
})
~~~

它先提取了vendor的公共js文件，包含了整个公共的npm模块。默认CommonsChunkPlugin插件会在最后一次提取的公共文件中加入webpackJsonp内容，包括了entry及chunk的md5的定义，所以会经常变动，这样一来公共的vendor文件不利于缓存，故vue-cli对公共部分又提取了一遍。将wenpackJsonp有抽提出来，生成manifest文件。

对于这个项目如果有公共的全局使用的js想打包进去怎么办？

方法一：

在entry中加个入口

~~~js
entry: {
  app: './src/main.js',
  'common': './common/index.js'
}
~~~

但是这样一来，打包出来的文件多了个common.js，如果我不想多出来一个js，想把common.js打包到npm 公共模块中怎么办？

只需在CommonsChunkPlugin中配置相同的name

~~~js
entry: {
  app: './src/main.js',
  'common': './common/index.js'
}

new webpack.optimize.CommonsChunkPlugin({
  name: 'common'
})
~~~

这样打包出来的文件就只有app.js和common.js这两个文件。

CommonsChunkPlugin文章：

https://segmentfault.com/q/1010000009276145

https://segmentfault.com/q/1010000009070061/a-1020000009073036



http://blog.csdn.net/itkingone/article/details/70331783

