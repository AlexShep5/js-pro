const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        filename: './build.js'
    },

    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader']
            },
        ],
      },

      plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "index.html")
        })
    ]
}
