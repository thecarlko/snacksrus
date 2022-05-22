


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = 
{
    mode: "development",
    devtool: "eval-source-map",
    entry: 
    {
        app: "./src/javascript/views/app/index.js"
    },
    output:
    {
        path: __dirname + '/public/dist',
        filename: '[name].js',
    },
    target: "web",
    devServer: 
    {
        compress: true, 
        hot: false, 
        https: false, 
        liveReload: false,
        port: "3011",
        static: 
        {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3011,
    },
    // watch: true,
    // watchOptions:
    // {
    //     aggregateTimeout: 1000,
    //     ignored: '**/node_modules'
    // },
    experiments:
    {
        topLevelAwait: true,
    },
    module:
    {
        rules: [
            {
                test: /\.(js|jsx)$/,    //kind of file extension this rule should look for and apply in test
                exclude: /node_modules/, //folder to be excluded
                use:  'babel-loader' //loader which we are going to use
            }
        ]
    }, 
    plugins: 
    [
        new HtmlWebpackPlugin({
            inject: true,
            template: `/public/index.html`,
        }),
    ]
};


