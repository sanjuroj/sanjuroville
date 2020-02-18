var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "src", "main.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/build/",
    },

    mode: "development",

    resolve: {
        alias: {
            contactImg: path.resolve(__dirname, 'assets/icons')
        }
    },


    devServer: {
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' } //eliminate in live config
    },

    module: {
        rules: [
            { test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader"},
            { test: /\.scss$/, exclude: /node_modules/, use: [
                {loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
            { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000"},
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.(jpg|svg|png)$/, exclude: /node_modules/, loader: "url-loader" },
            { test: /\.json$/, exclude: /node_modules/, loader: "json-loader" },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: "babel-loader" }}
        ]
    },

};


