var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "src", "main.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/build/",
        headers: { 'Access-Control-Allow-Origin': '*' } //eliminate in live config
        

    },

    resolve: {
        alias: {
            contactImg: path.resolve(__dirname, 'assets/icons')
        }
    },


    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader" ]},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.(jpg|svg|png)$/, exclude: /node_modules/, loader: "url-loader" },
            { test: /\.json$/, loader: "json" }
        ]
    },

    devServer: {
        historyApiFallback: true
    }


    
};


