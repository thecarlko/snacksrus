


module.exports = 
{
    mode: "development",
    devtool: "eval-source-map",
    entry: 
    {
        app: "./src/javascript/app/index.js"
    },
    output:
    {
        path: __dirname + '/public/dist',
        filename: '[name].js',
    },
    target: "web",
    devServer: 
    {
        port: "3011",
        static: ["./public/"],
        // open: true,
        // hot: true ,
        // liveReload: true
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
    }
};


