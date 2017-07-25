'use strict';

var fis = module.exports =  require('fis3');

fis.require.prefixes.unshift('fedao');
fis.cli.name = 'fedao';
fis.cli.info = require('./package.json');

const hostname = (function() {
  let ip = false;
  let net = require('os').networkInterfaces();

  Object.keys(net).every(function(key) {
    let detail = net[key];
    Object.keys(detail).every(function(i) {
      let address = String(detail[i].address).trim();
      if (address && /^\d+(?:\.\d+){3}$/.test(address) && address !== '127.0.0.1') {
        ip = address;
      }
      return !ip; // 找到了，则跳出循环
    });
    return !ip; // 找到了，则跳出循环
  });
  return ip || 'unknown';
})();

fis.set('project.ignore', fis.get('project.ignore').concat([
    '.svn/**',
    '**.md',
    'package.json',
    'MIT-LICENSE',
    'upload.py',
    'issue.info',
    'build.sh',
    'build.dev.sh',
    'issue.info',
    'BCLOUD',
    '**.yml',
    'fedao-conf.js'
]));

fis.set('project.fileType.text', 'es6,jsx,es');
fis.set('template', 'template');
// 设置liveload hostname及port，为了支持移动端liveload
fis.config.set('livereload.hostname', hostname);

// 开启px2rem
fis.enableRem = function(conf) {
    return fis.plugin('px2rem', {
        remUnit: conf.unit
    }, 'append')
};

fis.parseJS = function(conf) {
    if (conf.type === 'ts') {
        return fis.plugin('typescript', {
            module: 1, // commonjs
            target: 1, // {0: es3, 1: es5, 2: es6}  
            sourceMap: conf.sourceMap
        })
    }
    return fis.plugin('babel-5.x', {
        blacklist: ['regenerator'],
        optional: ["es7.decorators", "es7.classProperties"],
        sourceMaps: conf.sourceMap,
        stage: conf.stage || 3, // 2为了支持解构赋值 否则可以为3
    }, 'append')
}

fis.enbleRequire = function(conf) {
    return [
        fis.plugin('js-require-file', {
            useEmbedWhenSizeLessThan: 8
        }),
        fis.plugin('js-require-css', {
            mode: 'dependency'
        })
    ]
}

fis.enbleNpm = function() {
    // fis3 中预设的是 fis-components，这里不需要，所以先关了。
    fis.unhook('components');
    // 使用 fis3-hook-node_modules 插件。
    fis.hook('node_modules');
}
