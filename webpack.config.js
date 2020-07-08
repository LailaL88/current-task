const path = require('path');
module.exports = {
    // define entry file and output
    entry: './src/index.js',
    output: {
       path: path.resolve('dist'),
       filename: 'bundle.js'
    },
    // define babel loader
    module: {
        rules: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
              ],
            },
        ]
    }
};