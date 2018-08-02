'use strict';

function HtmlWebpackHashVersionPlugin() {}

HtmlWebpackHashVersionPlugin.prototype.apply = function (compiler) {
  if (compiler.hooks) {
    // webpack 4 support
    compiler.hooks.compilation.tap('HtmlWebpackHashVersionPlugin', (compilation) => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('HtmlWebpackHashVersionPlugin', function (htmlPluginData, callback) {
        this.injectAssetVersion(htmlPluginData, callback);
      });
    });
  } else {
    // Hook into the html-webpack-plugin processing
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlPluginData, callback) => {
        this.injectAssetVersion(htmlPluginData, callback);
      });
    });
  }
};

HtmlWebpackHashVersionPlugin.prototype.injectAssetVersion = function (htmlPluginData, callback) {
  function findHash(asset) {
    for (var i = 0; i < htmlPluginData.chunks.length; i++) {
      const chunk = htmlPluginData.chunks[i];
      const hash = chunk.hash;
      for (var j = 0; j < chunk.files.length; j++) {
        if (asset.endsWith(chunk.files[j])) {
          return hash;
        }
      }
    }
  }

  // inject CSS
  for (var i = 0; i < htmlPluginData.head.length; i++) {
    const tag = htmlPluginData.head[i];
    if (tag.tagName === 'link') {
      const hash = findHash(tag.attributes.href);
      if (hash) {
        tag.attributes.href += '?v=' + hash;
      }
    }
  }

  // inject JS
  for (i = 0; i < htmlPluginData.body.length; i++) {
    const tag = htmlPluginData.body[i];
    if (tag.tagName === 'script') {
      const hash = findHash(tag.attributes.src);
      if (hash) {
        tag.attributes.src += '?v=' + hash;
      }
    }
  }

  callback(null, htmlPluginData);
};

module.exports = HtmlWebpackHashVersionPlugin;
