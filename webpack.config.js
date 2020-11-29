const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
//
const packageJson = require('./package.json');

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', {
                        loader: 'css-loader', options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.json']
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'kassandra',
            filename: 'remoteEntry.js',
            exposes: {
                './KassandraApp': './src/boostrap'
            },
            shared: packageJson.dependencies
        }),
        new HTMLWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        port: 3002,
        hot: true,
        open: true,
        historyApiFallback: true
    }
}
