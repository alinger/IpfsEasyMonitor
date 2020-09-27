const { src, dest, series, parallel, watch } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

function clean(cb) {
    return del([
        'statics/js/all.min.js'
    ], cb);
}

function build() {
    console.log("start build");
    return src(['statics/js/config.js',
        'statics/js/routes.js',
        'statics/js/peerjs.min.js',
        'statics/js/RecordRTC.js',
        'statics/js/utils.js',
        'statics/js/chat.js',
        'statics/js/app.js'])
        .pipe(babel({
            presets: ['@babel/env', {
                "sourceType": "script"
            }],
            "plugins": [
                "transform-remove-strict-mode"
            ]
        }))
        .pipe(src('vendor/'))

        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(dest('statics/js/'));
}

function watchMe() {
    return watch(['statics/js/*.js'], function (cb) {
        // body omitted
        console.log("watch change");
        return build();
    });
}

exports.watch = watchMe;
exports.build = build;
exports.default = series(clean, parallel(build));