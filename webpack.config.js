const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const IS_PRODUCTION = process.env.NODE_ENV == 'production';

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/assets/scripts/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist/assets/scripts'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'expanded',
                            },
                        },
                    },
                ],
            },
        ],
    },
    mode: IS_PRODUCTION ? 'production' : 'development',
    performance: { hints: IS_PRODUCTION ? 'warning' : false },
    devtool: IS_PRODUCTION ? 'source-map' : 'cheap-module-source-map',
    optimization: {
        ...(IS_PRODUCTION && {
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin()
            ]
        }),
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    enforce: true,
                    chunks: 'all'
                },
            }
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../styles/[name].css"
        })
    ]
};
