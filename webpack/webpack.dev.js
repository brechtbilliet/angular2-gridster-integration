var loaders = require('./loaders');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        app: './src/index.ts',
        vendor: [
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/http',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            'bootstrap',
            'jquery',
            'rxjs',
            'bootstrap/dist/css/bootstrap.css',
            'font-awesome/css/font-awesome.css'
        ]
    },
    output: {
        filename: './[name].bundle.js',
        path: 'dev',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    debug: true,
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin([
            {from: 'node_modules/core-js/client/shim.min.js', to: 'node_modules/core-js/client/shim.min.js'},
            {from: 'node_modules/zone.js/dist/zone.js', to: 'node_modules/zone.js/dist/zone.js'},
            {from: 'node_modules/reflect-metadata/Reflect.js', to: 'node_modules/reflect-metadata/Reflect.js'}
        ]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        }),
        new OpenBrowserPlugin({url: 'http://localhost:8080'}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],
    module: {
        loaders: loaders
    }
};