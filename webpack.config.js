


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = 
{
    mode: "development",
    // mode: "production",
    devtool: "eval-source-map",
    entry: 
    {
        app: "./src/javascript/views/app/index.js"
    },
    output:
    {
        path: __dirname + '/public',
        filename: '[name].js',
    },
    target: "web",
    devServer: 
    {
        compress: true, 
        hot: false, 
        https: false, 
        liveReload: false,
        static: 
        {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 5500,
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
            title: "Spotify Clone",
            filename: "index.html",
            template: '/src/html/index.html',
            inject: true,
            scriptLoading: "defer",
        }),
    ]
};


