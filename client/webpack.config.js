module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 7777,
        contentBase: __dirname + '/public/',
        historyApiFallback: true,
    },

    // module: {
    //         loaders: [
    //             {
    //                 test: /\.js$/,
    //                 loader: 'babel-loader',
    //                 exclude: /node_modules/,
    //                 query: {
    //                     cacheDirectory: true,
    //                     presets: [['es2015', {modules: false}], 'react'],
    //                     plugin: [
    //                         'syntax-dynamic-import',
    //                         'transform-async-to-generator',
    //                         'transform-regenerator',
    //                         'transform-runtime'
    //                     ]
    //                 }
    //             }
    //         ]
    //     }
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {modules: false}], 'react'],
                    plugins: [
                        'transform-async-to-generator',
                        'transform-class-properties',
                        'transform-regenerator',
                        'transform-runtime'
                    ]
                }
            }]
        }]
    }
};