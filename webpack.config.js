let path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const output = {
    js: "",
    css: "css/main.css"
}

module.exports = (env, args) => {
    const isDev = args.mode === 'development' ? true : false;
    return {
        entry: {
            main: ["./dev/scss/main.scss", "./dev/js/main.js"],
        },
        output: {
            filename: "js/[name].js",
            path: path.resolve(__dirname, "./dist"),
            publicPath: "/"
        },
        devServer: {
            contentBase: "dist",
            bonjour: true,
            watchContentBase: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: /node_modules/
            },
                {
                    test: /\.(scss|sass)/,
                    use: [
                        {
                            loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    },
                        {
                            loader: "css-loader",
                    },
                        {
                            loader: "postcss-loader",
                    },
                        {
                            loader: "sass-loader",
                    }
                ]
            },
                {
                    test: /\.(jpg|jpeg|png|svg)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
            }, 
                {
                    test: /\.(ttf|eot|woff|woff2|svg)$/,
                    use: isDev ? "url-loader" : {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]"
                        }
                    }
                }
        ]
        },
        plugins: [
//        new BrotliGzipPlugin({
//                asset: '[path].br[query]',
//                algorithm: 'brotli',
//                test: /\.(js|css|html|svg|ttf|eot|woff|woff2)$/,
//                threshold: 10240,
//                minRatio: 0.8,
//                quality: 11
//            }),
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.(js|css|ttf|eot|woff|woff2|svg)$/,
//                threshold: 1,
                minRatio: 0.8
            }),
            new MiniCssExtractPlugin({
                filename: output.css,
            }),
        ]
    }
}