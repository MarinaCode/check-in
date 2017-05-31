var gulp = require('gulp');
var exec = require('child_process').exec;
gulp.task('build', function (cb) {
  exec('ng build',{maxBuffer: 1024 * 500}, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
