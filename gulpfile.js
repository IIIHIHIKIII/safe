const gulp = require('gulp');

const NimiqBuild = require('./build-process/nimiq-base-gulpfile.js');

gulp.task('clean', () => NimiqBuild.cleanBuild('deployment-safe/dist'));

gulp.task('build', gulp.series('clean', () => NimiqBuild.build({
    jsEntry: [
        'node_modules/moment/min/moment.min.js',
        'src/lib/vue.min.js', // Production version
        'node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.min.js',
        'src/safe.js'
    ],
    cssEntry: [
        'src/safe.css',
        'node_modules/@nimiq/vue-components/dist/NimiqVueComponents.css',
    ],
    htmlEntry: 'src/index.html',
    rootPath: __dirname,
    distPath: 'deployment-safe/dist',
    minify: false
})));

gulp.task('default', gulp.parallel('build'));
