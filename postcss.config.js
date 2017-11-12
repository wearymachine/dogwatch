var postcssSmartImport = require('postcss-smart-import');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        postcssSmartImport,
        precss,
        autoprefixer
    ]
};
