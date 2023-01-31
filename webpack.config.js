const miniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      dom: './src/dom.js',
      listeners: './src/listeners.js',
      projects: './src/projects.js',
      tasks: './src/tasks.js',
      localstorage: './src/localstorage.js'
      },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
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
        new miniCssExtractPlugin(),
        ],  
    module: {
        rules: [
            {
            test: /\.css$/i,
            use: [{
              // inject CSS to page
              loader: 'style-loader'
            }, {
              // translates CSS into CommonJS modules
              loader: 'css-loader'
            }],
            /* removed because I don't think I imported scss properly and dont really want to use it yet for this project
            , {
              // Run postcss actions
              loader: 'postcss-loader',
              options: {
                // `postcssOptions` is needed for postcss 8.x;
                // if you use postcss 7.x skip the key
                postcssOptions: {
                  // postcss plugins, can be exported to postcss.config.js
                  plugins: function () {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              }
            }, {
            // Extracts CSS for each JS file that includes CSS
                loader: miniCssExtractPlugin.loader
            }, {
              // compiles Sass to CSS
              loader: 'sass-loader'
            }] */
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
        },
};
