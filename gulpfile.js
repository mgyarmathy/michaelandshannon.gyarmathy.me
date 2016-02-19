var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        server: {
            baseDir: '.'
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('_sass/i.scss')
        .pipe(sass({
            includePaths: ['_sass'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch('_sass/*.scss', ['sass']);
    gulp.watch(['index.html'], ['reload']);
});

gulp.task('default', ['browser-sync', 'watch']);
