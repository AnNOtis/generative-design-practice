const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const inject = require('gulp-inject')
const insert = require('gulp-insert')
const merge = require('merge-stream')
const concat = require('gulp-concat')

const SRC_PATH = path.join(__dirname, 'src')
const DIST_PATH = path.join(__dirname, 'dist')
const COMMON_SASS_PATH = ['common/css/**/*.sass']
const COMMON_JS_PATH = ['common/js/p5/p5.js']
const PAGE_JS_PATH = 'src/**/*.js'
const PAGE_SASS_PATH = 'src/**/*.sass'
const PAGES_GLOB = path.join(SRC_PATH, '**/index.html')

// Get target chapter folders recursively
const getFolders = dir => {
  const dirs = fs.readdirSync(dir)
    .map(file => path.join(dir, file))
    .filter(path => fs.statSync(path).isDirectory())

  // Use `[].concat.apply' for flating array
  return [].concat.apply(dirs, dirs.map(getFolders)).sort()
}

gulp.task('common_sass', () =>
  gulp.src(COMMON_SASS_PATH)
    .pipe(sass())
    .pipe(concat('common.css'))
    .pipe(gulp.dest(DIST_PATH))
)

gulp.task('common_js', () =>
  gulp.src(COMMON_JS_PATH)
    .pipe(concat('common.js'))
    .pipe(gulp.dest(DIST_PATH))
)

gulp.task('page_js', () =>
  gulp.src(PAGE_JS_PATH, {base: SRC_PATH})
    .pipe(babel({presets: ['env']}))
    .pipe(gulp.dest(DIST_PATH))
)

gulp.task('page_sass', () =>
  gulp.src(PAGE_SASS_PATH, {base: SRC_PATH})
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(DIST_PATH))
)

gulp.task('injectAssetsToPage', () => {
  const pages = getFolders(SRC_PATH).map(dir => {
    const jsSources = gulp.src( path.join(dir, '*.js'), {read: false})
    const cssSources = gulp.src(path.join(dir, '*.+(sass|css)'), {read: false})

    const pathFromRoot = path.relative(dir, SRC_PATH)

    return gulp.src(path.join(dir, 'index.html'), {base: SRC_PATH})
      .pipe(insert.transform(contents => {
        const endHead = contents.indexOf('</head>')
        const endBody = contents.indexOf('</body>')

        return (
          contents.slice(0, endHead) +
          htmlStyleSheetTag(path.join(pathFromRoot, 'common.css')) +
          '\n<!-- inject:css -->\n<!-- endinject -->\n' +
          contents.slice(endHead, endBody) +
          htmlJsTag(path.join(pathFromRoot, 'common.js')) +
          '\n<!-- inject:js -->\n<!-- endinject -->\n' +
          contents.slice(endBody)
        )
      }))
      .pipe(inject(jsSources, {relative: true}))
      .pipe(inject(cssSources, {
        relative: true,
        starttag: '<!-- inject:css -->',
        transform: filepath => htmlStyleSheetTag(filepath.replace('.sass', '.css'))
      }))
      .pipe(gulp.dest(DIST_PATH))
  })

  return merge(pages)
})

function htmlStyleSheetTag(path) {
  return `<link rel="stylesheet" href="${path}">`
}

function htmlJsTag(path) {
  return `<script src="${path}"></script>`
}

gulp.task('createHomepage', () =>
  gulp.src('index.html')
    .pipe(inject(gulp.src(PAGES_GLOB), {
      ignorePath: 'src',
      starttag: '<!-- inject:links -->',
      base: SRC_PATH,
      transform: (filepath, file) => {
        const singlePageDoc = file.contents.toString('utf8')
        const matchedTitle = singlePageDoc.match(/<title>(.+)<\/title>/i)
        const title = matchedTitle ? matchedTitle[1] : filepath
        return `<li><a href="${filepath.slice(1)}">${title}</a></li>`
      }
    }))
    .pipe(gulp.dest(DIST_PATH))
)

gulp.task('build', ['page_js', 'page_sass', 'common_sass', 'common_js'])
gulp.task('watch', () => {
  gulp.watch(PAGE_JS_PATH, ['page_js'])
  gulp.watch(PAGE_SASS_PATH, ['page_sass'])
  gulp.watch(COMMON_SASS_PATH, ['common_sass'])
  gulp.watch(COMMON_JS_PATH, ['common_js'])
  gulp.watch(PAGES_GLOB, ['createHomepage', 'injectAssetsToPage'])
})

gulp.task('default', ['build', 'createHomepage', 'injectAssetsToPage'])
