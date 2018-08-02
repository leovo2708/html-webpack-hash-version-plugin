Hash Version extension for HTML Webpack Plugin
========================================

Another solution to solve caching problem by append hash version on each assets:
```code
/assets/main.js => /assets/main.js?v={hash}
```

Installation
------------
You must be running webpack on node 0.12.x or higher

Install the plugin with npm:
```shell
$ npm install --save-dev html-webpack-hash-version-plugin
```

Basic Usage
-----------
Require the plugin in your webpack config:

```javascript
var HtmlWebpackHashVersionPlugin = require('html-webpack-hash-version-plugin');
```

Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackHashVersionPlugin()
]  
```

You should configure fileName & chunkFilename for assets with no hash because this plugin will do this for us
```javascript
{
  // ...
  filename: 'static/js/[name].js',
  chunkFilename: 'static/js/[name].chunk.js'
  // ...
}
```
