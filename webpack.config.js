/* eslint-disable no-var */
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var path = require('path');
var webpack = require('webpack');

var production = process.env.NODE_ENV === 'production';
var development = !production;

module.exports = function() {
    var config = {
        context: __dirname,
        devtool: development ? 'source-map' : false,
        entry: {
            app: './browser/app.js',
            config: './config/local.json',
            coreJs: 'core-js',
            react: 'react',
            reactAddonsShallowCompare: 'react-addons-shallow-compare',
            reactDatepicker: 'react-datepicker',
            reactDom: 'react-dom',
            reactHighlighter: 'react-highlighter',
            reactRouterDom: 'react-router-dom',
            recompose: 'recompose'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader'
                    },
                    exclude: /node_modules\/(?!(remedy-sso-auth0)\/).*/
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        use: 'css-loader!postcss-loader?sourceMap=inline!less-loader'
                    })
                },
                {
                    test: /\.(png|svg|eot|woff|woff2|ttf)$/,
                    loader: 'url-loader'
                }
            ]
        },
        plugins: [
             new HtmlWebpackPlugin({
             template: './browser/index.html',
             filename: 'index.html'
         })
     ]
        // plugins: [
        //     new ManifestPlugin(),
        //     new ChunkManifestPlugin(),
            // new HtmlWebpackPlugin({
            //     template: './browser/index.html',
            //     filename: 'index.html'
            // }),
        //     new webpack.optimize.CommonsChunkPlugin({
        //         name: [
        //             'app',
        //             'config',
        //             'coreJs',
        //             'react',
        //             'react',
        //             'react-addons-shallow-compare',
        //             'reactDatepicker',
        //             'reactDom',
        //             'reactHighlighter',
        //             'reactRouterDom',
        //             'recompose'
        //         ]
        //     }),
        //     new webpack.optimize.CommonsChunkPlugin({
        //         name: 'manifest'
        //     })
        // ]
    };

    if (development) {
        config.devServer = {
            https: {
                key: fs.readFileSync('./ssl/server.key'),
                cert: fs.readFileSync('./ssl/server.crt'),
                ca: fs.readFileSync('./ssl/server.csr')
            },
            port: 4000,
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, 'dist')
        };

        config.output = {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist/client'),
            publicPath: '/'
        };
    } else {
        config.output = {
            chunkFilename: '[chunkhash].[name].js',
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist/client'),
            publicPath: '/'
        };

        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
        );

        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin()
        );
    }

    return config;
}
