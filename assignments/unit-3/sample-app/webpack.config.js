const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  entry: './assets/js/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.min.js'
  },
  plugins: [
    // To strip all locales except “en”
    new MomentLocalesPlugin()
  ],
};


