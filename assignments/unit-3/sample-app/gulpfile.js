const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

function css() {
  return src('assets/css/style.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(dest('build'))
}

async function js() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return reject(err)
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join('\n')))
      }
      resolve()
    })
  })
}

exports.css = css;
exports.js = js;
exports.default = parallel(css, js);