const { src, watch, series, dest } = require('gulp');
const util = require('gulp-util');

//Dev
const sass = require('gulp-sass')(require('sass'));
const browsersync = require('browser-sync')


// Prod
const minCss = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const processhtml =require('gulp-processhtml');
const rep = require('gulp-replace-image-src');
//Tasks dev

const browsersyncReload = (cb) => {
    browsersync.reload();
    cb();
}

const sassTask = () =>{
    return src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(dest('./src/css'))
}

const watchTasks = () => {
    browsersync.init({
        server: {
          baseDir: '.'
        }    
      });
    watch('*.html', browsersyncReload);
    watch('./src/scss/**/*.scss', series(sassTask, browsersyncReload))
}

//Tasks prod
const minCssTask = () => {
    return src('./src/css/main.css')
    .pipe(minCss())
    .pipe(dest('./dist/css'))
}

const babelTask = () => {
    return src('./src/js/index.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest('./dist/js'))
}

const htmlTask = () => {
    return src('./index.html')
    .pipe(processhtml())
    .pipe(rep({
        prependSrc : './images/',
        keepOrigin : false
      }))
    .pipe(htmlmin({ collapseWhitespace: true,
    removeComments: true }))
    .pipe(dest('./dist'));
}
const copyImg = () => {
    return src('./src/images/**/*')
    .pipe(dest('./dist/images'))
}

// exports depending gulp command dev or prod
exports.default = util.env.prod?series (
    minCssTask,
    babelTask,
    htmlTask,
    copyImg
):series (
    sassTask,
    watchTasks
)
