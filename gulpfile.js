var gulp               = require('gulp'),
    uglify             = require('gulp-uglify'),
    buffer             = require('vinyl-buffer'),
    source             = require('vinyl-source-stream'),
    browserify         = require('browserify'),
    gls                = require('gulp-live-server'),
    open               = require('gulp-open'),
    os                 = require('os'),
    ip                 = require('ip'),
    $build             = 'build',
    $port              = 3004,
    $address           = ip.address();
    
var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));
    
 
gulp.task('server', function() {
	var server = gls.static($build, $port);
	server.start();
    
    var options = {
        uri: 'http://'+ $address +':' + $port,
        app: browser
    };
    gulp.src(__filename)
        .pipe(open(options));

	/*gulp.watch([$build + '/js/*.js',$build + '/*.html'], function (file) {
		server.notify.apply(server, [file]);
	});*/
});

gulp.task('browserify', function() {  
  return browserify('./build/js/app.main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});



gulp.task('default', function() {
  gulp.start(['browserify', 'server']);
  return;
});