var bootstrapPath = __dirname + '/node_modules/bootstrap/dist/css';
var bootstrapSocialPath = __dirname + '/node_modules/bootstrap-social';

module.exports = {

    // This is the entry point or start of our react application
    entry: './app/app.js',

    // The plain compiled JavaScript will be output into this file
    output: {
        path: 'public',
        filename: 'bundle.js'
    },

    // This section describes the transformations we will perform
    module: {
        loaders: [
            {test: /\.jsx?$/, include: /app/, loader: 'babel', query: {presets: ['react', 'es2015']}},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
            {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000'}
        ]
    },
    // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
    // Without this the console says all errors are coming from just coming from bundle.js
    devtool: 'eval',

    resolve: {
        extensions: ['', '.js', '.css'],
        modulesDirectories: ['node_modules', bootstrapPath, bootstrapSocialPath]
    },
    // Additional plugins for CSS post processing using postcss-loader
    postcss: [
        require('autoprefixer'), // Automatically include vendor prefixes
        require('postcss-nested') // Enable nested rules, like in Sass
    ]
};
