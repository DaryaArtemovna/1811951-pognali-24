import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import svgstore from 'gulp-svgstore';
import cssnano from 'cssnano';
import del from 'del';
import rename from 'gulp-rename';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';
import svgo from 'imagemin-svgo';
import cache from 'gulp-cache';

const PATHS = {
  watchers: {
    html: 'source/**/*.html',
    less: 'source/less/**/*.less',
    js: 'source/js/**/*.js',
    images: 'source/img/**/*',
    misc: 'source/misc/**/*',
    fonts: 'source/fonts/**/*'
  },
  entries: {
    html: 'source/**/*.html',
    less: 'source/less/*.less',
    js: 'source/js/**/*.js',
    cssnano: 'build/css/*.css',
    images: 'source/img/**/*',
    imagemin: 'source/img/**/*.{gif,png,jpg,svg}',
    misc: 'source/misc/**/*',
    webp: 'source/img/*.{png,jpg}',
    svgsprite: 'source/img/sprite/*.svg',
    fonts: 'source/fonts/**/*.{woff,woff2}'
  },
  outputs: {
    html: 'build',
    css: 'build/css',
    js: 'build/js',
    cssnano: 'build/css',
    imagemin: 'source/img/compressed',
    webp: 'source/img/webp',
    svgsprite: 'source/img/sprite',
    fonts: 'build/fonts'
  }
};

// Server

const server = () => {
  browser.init({
    server: PATHS.outputs.html,
    cors: true,
    notify: false,
    ui: false,
    open: true
  });
  gulp.watch(PATHS.watchers.html, gulp.series(html, reload));
  gulp.watch(PATHS.watchers.less, gulp.series(styles));
  gulp.watch(PATHS.watchers.js, gulp.series(build, reload));
  gulp.watch(PATHS.watchers.images, gulp.series(build, reload));
  gulp.watch(PATHS.watchers.misc, gulp.series(build, reload));
  gulp.watch(PATHS.watchers.fonts, gulp.series(build, reload));
};

// Html

const html = () => {
  return gulp
    .src(PATHS.entries.html)
    .pipe(gulp.dest(PATHS.outputs.html))
    .pipe(browser.stream());
};

// Styles

export const styles = () => {
  return gulp
    .src(PATHS.entries.less, { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(PATHS.outputs.css, { sourcemaps: '.' }))
    .pipe(browser.stream());
};

// cssMin

const cssMin = () => {
  const plugins = [autoprefixer(), cssnano()];
  return gulp
    .src(PATHS.entries.cssnano)
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATHS.outputs.cssnano));
};

// Images

export const cookImages = () => {
  return gulp
    .src(PATHS.entries.imagemin)
    .pipe(
      cache(
        imagemin([
          pngquant({ speed: 1, quality: [0.95, 1] }),
          mozjpeg({ progressive: true }),
          svgo({
            plugins: [
              { name: 'removeViewBox', active: false },
              { name: 'cleanupIDs', active: false }
            ]
          })
        ])
      )
    )
    .pipe(gulp.dest(PATHS.outputs.imagemin));
};

// Webp

export const cookWebp = () => {
  return gulp
    .src([PATHS.entries.webp])
    .pipe(webp({ quality: 90, method: 5 }))
    .pipe(gulp.dest(PATHS.outputs.webp));
};

// Sprite

export const svgsprite = () => {
  return gulp
    .src([PATHS.entries.svgsprite])
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(gulp.dest(PATHS.outputs.svgsprite));
};

// Reload

const reload = (done) => {
  browser.reload();
  done();
};

// Remove

const remove = () => {
  return del(['build']);
};

// Source into build

const copy = () => {
  return gulp
    .src(
      [
        PATHS.entries.html,
        PATHS.entries.js,
        PATHS.entries.images,
        PATHS.entries.misc,
        PATHS.entries.fonts
      ],
      {
        base: 'source/'
      }
    )
    .pipe(gulp.dest('build'));
};

export const build = gulp.series(remove, styles, cssMin, copy)
export const serve = gulp.series(build, server);
