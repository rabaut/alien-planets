var gulp = require('gulp'),
		gutil = require('gulp-util'),
		gulpif = require('gulp-if'),
		browserify = require('gulp-browserify'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
		connect = require('gulp-connect'),
		plumber = require('gulp-plumber'),
		http = require('http'),
		path = require('path'),
		rmdir = require('rimraf');

var onError = function (err) {  
  gutil.beep();
  console.log(err);
};

gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

gulp.task('vendor', function() {
	gulp.src('vendor/*.js')
		.pipe(gulp.dest('dist/assets/'))
		.pipe(connect.reload());
});

gulp.task('scripts', function() {
	gulp.src('game/**/*.js')
		.pipe(plumber(onError))
		.pipe(browserify())
		.pipe(concat('scripts.js'))
		.pipe(gulpif(gutil.env.production, uglify()))
		.pipe(gulp.dest('dist/assets/'))
		.pipe(connect.reload());
});

gulp.task('styles', function() {
	gulp.src('styles/**')
		.pipe(gulp.dest('dist/assets'))
		.pipe(connect.reload());
});

gulp.task('html', function() {
	gulp.src('*.html')
		.pipe(gulp.dest('dist/'))
		.pipe(connect.reload());
});

gulp.task('images', function() {
	gulp.src('assets/images/**')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/assets/images/'))
		.pipe(connect.reload());
});

gulp.task('maps', function() {
	gulp.src('assets/maps/json/**')
		.pipe(gulp.dest('dist/assets/maps/'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('vendor/**', ['vendor']);
	gulp.watch('game/**/*.js', ['scripts']);
	gulp.watch('styles/**', ['styles']);
	gulp.watch('assets/images/**', ['images']);
	gulp.watch('assets/maps/json/**', ['maps']);
	gulp.watch('*.html', ['html']);
});

gulp.task('clean', function() {
	rmdir('dist', function() {});
});

gulp.task('build', ['clean', 'vendor', 'scripts', 'styles', 'images', 'maps', 'html']);

gulp.task('default', ['connect', 'build', 'watch']);