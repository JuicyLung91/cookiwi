let mix = require('laravel-mix');
require('laravel-mix-polyfill');

const prfx = 'cookieconsent-v2-';
const DIR = './dist';

const params = { processCssUrls: false }

mix
    .options(params)
    //frontend files
    .js(['./res/js/app.js'],'./dist/js/app.js')
    .copy('./dist/js/app.js', DIR + '/' + prfx + 'app.min.js') //no .babel because of the .babelrc file


    .sass('./res/scss/index.scss', './dist/' + prfx +'styles.css')
    // .copy('./dist/css/styles.css', DIR + '/styles/' + prfx + '-styles.css')
