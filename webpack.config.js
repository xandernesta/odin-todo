const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
        },
    devServer: {
        static: './dist',
        host: '192.168.99.190', // in this section, I have tried to change IP address by server IP
        port: 3000
        },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Todo List',
            container: 'class="projectContainer"',
            template: './src/template_index.html',
            filename: './index.html'
        }),
        ],  
    module: {
        rules: [
            {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            },
        ],
        },
    optimization: {
        runtimeChunk: 'single',
        },
};