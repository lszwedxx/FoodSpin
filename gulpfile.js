const gulp = require('gulp');
//Dev
const sass = require('gulp-sass')(require('sass'));
const browsersync = require('browser-sync').create();
//Prod
const minCss = require('gulp-clean-css');
const babel = require('gulp-babel');