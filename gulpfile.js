const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const inject = require('gulp-inject')
const insert = require('gulp-insert')
const merge = require('merge-stream')

const SRC_PATH = 'src'
const DIST_PATH = 'dist'
const JS_PATH = 'src/**/*.js'
const SASS_PATH = 'src/**/*.sass'
const PAGES_GLOB = path.join(SRC_PATH, '**/index.html')

// Get target chapter folders recursively
const getFolders = dir => {
  const dirs = fs.readdirSync(dir)
    .map(file => path.join(dir, file))
    .filter(path => fs.statSync(path).isDirectory())

  // Use `[].concat.apply' for flating array
  return [].concat.apply(dirs, dirs.map(getFolders)).sort()
}

gulp.task('js', () =>
  gulp.src(JS_PATH, {base: './'})
    .pipe(babel({presets: ['env']}))
    .pipe(gulp.dest(DIST_PATH))
)

gulp.task('sass', () =>
  gulp.src(SASS_PATH, {base: './'})
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(DIST_PATH))
)

gulp.task('injectAssetsToPage', () => {
  const pages = getFolders(SRC_PATH).map(dir => {
    const jsSources = gulp.src(path.join(dir, '*.js'), {read: false})
    const cssSources = gulp.src(path.join(dir, '*.+(sass|css)'), {read: false})

    return gulp.src(path.join(dir, 'index.html'), {base: './'})
      .pipe(insert.transform(contents => {
        const endHead = contents.indexOf('</head>')
        const endBody = contents.indexOf('</body>')

        return (
          contents.slice(0, endHead) +
          '<!-- inject:css -->\n<!-- endinject -->\n' +
          contents.slice(endHead, endBody) +
          '<!-- inject:js -->\n<!-- endinject -->\n' +
          contents.slice(endBody)
        )
      }))
      .pipe(inject(jsSources))
      .pipe(inject(cssSources, {
        starttag: '<!-- inject:css -->',
        transform: filepath => `<link rel="stylesheet" href="${filepath.replace('.sass', '.css')}">`
      }))
      .pipe(gulp.dest(DIST_PATH))
  })

  return merge(pages)
})

gulp.task('createHomepage', () =>
  gulp.src('index.html')
    .pipe(inject(gulp.src(PAGES_GLOB), {
      starttag: '<!-- inject:links -->',
      base: './',
      transform: (filepath, file) => {
        const singlePageDoc = file.contents.toString('utf8')
        const matchedTitle = singlePageDoc.match(/<title>(.+)<\/title>/i)
        const title = matchedTitle ? matchedTitle[1] : filepath
        return `<li><a href="${filepath}">${title}</a></li>`
      }
    }))
    .pipe(gulp.dest(DIST_PATH))
)

gulp.task('build', ['js', 'sass'])
gulp.task('watch', () => {
  gulp.watch(JS_PATH, ['js'])
  gulp.watch(SASS_PATH, ['sass'])
  gulp.watch(PAGES_GLOB, ['createHomepage', 'injectAssetsToPage'])
})

gulp.task('default', ['build', 'createHomepage', 'injectAssetsToPage'])
