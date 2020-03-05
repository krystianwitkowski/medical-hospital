const gulp            = require('gulp');
const browserSync     = require('browser-sync').create();
const plumber         = require('gulp-plumber');
const reload          = browserSync.reload;
const sass            = require('gulp-sass');
const autoprefixer    = require('autoprefixer');
const concat          = require('gulp-concat');
const cssmin          = require('gulp-cssmin');
const uglify          = require('gulp-uglify');
const babel           = require('gulp-babel');
const rename          = require('gulp-rename');
const imagemin        = require('gulp-imagemin');
const imageminOptipng = require('imagemin-optipng');
const stripCss        = require('gulp-strip-css-comments');
const processhtml     = require('gulp-processhtml');
const postcss         = require('gulp-postcss');
const cssnext         = require('postcss-cssnext')
const eslint          = require('gulp-eslint');

const folders = {
  src: './src',
  dist: './dist'
}

gulp.task('default', ['watch']);

gulp.task('server', ()=>{
  browserSync.init({
    server: {
        baseDir: "src"
    },
    browser: ['chrome']
  });
});

gulp.task('sass', ()=>{
const plugins = [
  cssnext({
    browsers: ['last 2 version']
  })
];
  return gulp.src('src/sass/global.scss')
    .pipe(concat('main.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(stripCss())
    .pipe(gulp.dest(folders.src + '/stylesheets'));
});

gulp.task('css-build', ()=>{
  return gulp.src('src/stylesheets/main.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(cssmin())
    .pipe(stripCss())
    .pipe(gulp.dest(folders.dist + '/stylesheets'))
});

gulp.task('js-build', ()=>{
  return gulp.src(['src/js/*.js','!src/js/bundle.js'])
  .pipe(concat('bundle.js'))
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(babel())
  .pipe(gulp.dest(folders.src + '/js'))
  .pipe(concat('bundle.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(babel())
  .pipe(uglify())
  .pipe(gulp.dest(folders.dist + '/js'))
});

gulp.task('imagemin', ()=>{
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest(folders.dist + '/images'))
});

gulp.task('htmls', ()=>{
return gulp.src('src/*.html')
  .pipe(processhtml())
  .pipe(gulp.dest(folders.dist))
});

gulp.task('fonts', ()=>{
  return gulp.src('src/fonts/*')
  .pipe(gulp.dest(folders.dist + '/fonts'))
})

gulp.task('watch', ['server','sass','css-build','js-build','htmls','imagemin','fonts'], ()=>{
  gulp.watch('src/sass/**/*', ['sass']);
  gulp.watch('src/stylesheets/*.css', ['css-build']).on('change', reload);
  gulp.watch('src/js/*.js', ['js-build']).on('change', reload);
  gulp.watch('src/images/*', ['imagemin']);
  gulp.watch('src/fonts/*', ['fonts']);
  gulp.watch('src/*.html', ['htmls']).on('change', reload);
});
