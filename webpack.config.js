const path = require('path');

module.exports = {
    entry: './youtube-client/index.js',
    output: {
        path: path.join(__dirname,'youtube-client/dist'),
        filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
}
