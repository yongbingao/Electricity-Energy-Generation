const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'bundle.js',
    },
    devtool: 'eval-source-map',
};