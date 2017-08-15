/**
 * Created by jmcneely on 2/27/17. -
 */
var gulp = require('gulp');

var concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    pug = require('gulp-pug2'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');
    uglifycss = require('gulp-uglifycss');

var js_files = [
    './bower_components/jquery/dist/jquery.js',
    './bower_components/lodash/lodash.min.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    './bower_components/angular/angular.js',
    './bower_components/angular-aria/angular-aria.js',
    './bower_components/ng-password-meter/dist/ng-password-meter.js',
    './bower_components/angular-route/angular-route.js',
    './bower_components/angular-sanitize/angular-sanitize.js',
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    './bower_components/moment/min/moment.min.js',
    './bower_components/angular-cookie/angular-cookie.js',
    './app/apanaApp.js',
    './app/router.js',
    './app/controllers/**/*.js',
    './app/directives/**/*.js',
    './app/factories/**/*.js',
    './app/filters/**/*.js',
];

gulp.task('scripts', function(){
    return gulp.src(js_files)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/'))
});

gulp.task('scripts-min', function(){
    return gulp.src(js_files)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task('sass', function(){
    return gulp.src('app/css/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('build'))
});

gulp.task('sass-min', function(){
    return gulp.src('app/css/app.scss')
        .pipe(sass())
        .pipe(uglifycss())
        .pipe(gulp.dest('build'))
});

gulp.task('pug', function(){
    return gulp.src(['app/views/**/*.pug','!app/views/pug_templates/**/*'])
        .pipe(pug())
        .pipe(gulp.dest('build/views'))
});

gulp.task('html', function(){
  return gulp.src('app/views/**/*.html')
    .pipe(gulp.dest('build/views'))
});

gulp.task('index', function(){
    return gulp.src('build/views/index.html')
        .pipe(gulp.dest('build'))
});

gulp.task('img', function(){
    return gulp.src(['app/img/**/*'])
        .pipe(gulp.dest('build/img'))
});

gulp.task('font', function(){

    gulp.src('bower_components/font-awesome/**/*.*')
        .pipe(gulp.dest('app/fonts'));
    gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*')
        .pipe(gulp.dest('app/fonts'));
    gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('translate', function(){
  gulp.src('app/translations/*')
    .pipe(gulp.dest('build/translations'))
});

gulp.task('lib', function(){
  gulp.src(['bower_components/highcharts/**/*', 'bower_components/highcharts/*'])
    .pipe(gulp.dest('build/highcharts'));
  gulp.src(['bower_components/angular-material/**/*','bower_components/angular-material/*'])
    .pipe(gulp.dest('build/angular-material'));
  gulp.src(['bower_components/ng-password-meter/**/*','bower_components/ng-password-meter/*'])
    .pipe(gulp.dest('build/ng-password-meter'));
});

gulp.task('watch', function(){
    gulp.watch('app/**/*.js', ['scripts']);
    gulp.watch('app/css/**/*.scss', ['sass']);
    gulp.watch('app/views/**/*.pug', ['pug', 'index']);
    gulp.watch('app/views/**/*.html', ['html']);
    gulp.watch('img/**/*', ['img']);
    gulp.watch('app/translations/*.json', ['translate']);
});

gulp.task('start-min', function(){
    gulp.start('scripts-min');
    gulp.start('font');
    gulp.start('sass-min');
    gulp.start('pug');
    gulp.start('html');
    gulp.start('index');
    gulp.start('img');
    gulp.start('translate');
    gulp.start('lib');
    gulp.start('watch');
});

gulp.task('start', function(){
    gulp.start('scripts');
    gulp.start('font');
    gulp.start('sass');
    gulp.start('pug');
    gulp.start('html');
    gulp.start('index');
    gulp.start('img');
    gulp.start('translate');
    gulp.start('lib');
    gulp.start('watch');
});

gulp.task('exec', function(){
    gulp.start('scripts');
    gulp.start('font');
    gulp.start('sass');
    gulp.start('pug');
    gulp.start('html');
    gulp.start('index');
    gulp.start('img');
    gulp.start('translate');
    gulp.start('lib');
});
