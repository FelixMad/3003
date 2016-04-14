var gulp               = require('gulp'),
    gls                = require('gulp-live-server'),
    open               = require('gulp-open'),
    ip                 = require('ip'),
    uglify             = require('gulp-uglify'),
    browserify         = require('browserify'),
    $vinylsourcestream = require('vinyl-source-stream'),
    buffer             = require('vinyl-buffer'),
    $build             = 'build',
    $port              = 3003,
    $address           = ip.address();
 
gulp.task('server', function() {
	var server = gls.static($build, $port);
	server.start();
    
    var options = {
        uri: 'http://'+ $address +':' + $port,
        app: 'google chrome'
    };
    gulp.src(__filename)
        .pipe(open(options));

	gulp.watch([$build + '/js/*.js',$build + '/*.html'], function (file) {
		server.notify.apply(server, [file]);
	});
});

gulp.task('browserify', function() {  
  return browserify('./js/app.main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});



gulp.task('default', function() {
  gulp.start(['browserify', 'server']);
  return;
});