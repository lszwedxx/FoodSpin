const { src, watch, series, dest } = require('gulp');
const util = require('gulp-util');

//Dev
const sass = require('gulp-sass')(require('sass'));
const browsersync = require('browser-sync').create();

//Prod
const minCss = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify =require('gulp-uglify')

//Tasks dev
const browsersyncServe = (cb)=> {
    if(util.env.pord){
        cb();
    }else{
        browsersync.init({
            server: {
              baseDir: '.'
            }    
          });
    }
}
const browsersyncReload = (cb) => {
    browsersync.reload();
    cb();
}

const sassTask = () =>{
    return src('./src/scss/main.scss')
    .pipe(sass())
    .pipe(dest('./src/css'))
}

const watchTasks = () => {
    watch('*.html', browsersyncReload);
    watch('./src/scss/main.scss', series(sassTask, browsersyncReload))
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

// exports depending gulp command dev or prod
    exports.default = util.env.prod?series (
        minCssTask,
        babelTask
    ):series (
        sassTask,
        browsersyncServe,
        watchTasks
    )
    
