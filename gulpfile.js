const gulp = require('gulp');
const del = require('del');
const merge = require('merge2');
const ts = require('gulp-typescript');

const paths = {
    src: 'src',
    dist: 'lib'
};

const tsProject = ts.createProject('tsconfig.json');

const clean = () => {
    return del([paths.dist]);
}
exports.clean = clean;

const transpile = () => {
    var tsResult = gulp.src(`${paths.src}/**/*.ts`)
        .pipe(tsProject());
    return merge([tsResult.js.pipe(gulp.dest(paths.dist)),
        tsResult.dts.pipe(gulp.dest(paths.dist))
    ]);
}
exports.transpile = transpile;

const build = gulp.series(clean, transpile);
exports.build = build;