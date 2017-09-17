import gulp from 'gulp'
import concat from 'gulp-concat'         // 文件拼接
import webpack from 'webpack'            // 打包工具
import gulpWebpack from 'webpack-stream' // 文件流工具
import named from 'vinyl-named'          // 对文件重命名做标记
import gulpif from 'gulp-if'             // if判断
import livereload from 'gulp-livereload' // 热加载
import plumber from 'gulp-plumber'       // 处理文件信息流
import rename from 'gulp-rename'         // 对文件重命名
import uglify from 'gulp-uglify'         // 处理js、css文件压缩
import {log, colors} from 'gulp-util'     // 命令行工具输出
import args from './util/args'           // 对命令行做解析

// 创建任务 - 处理js文件
gulp.task('scripts', ()=>{
    return gulp.src(['app/js/index.js'])
        .pipe(plumber({

        }))
        .pipe(named())
        .pipe(gulpWebpack({
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel'
                }]
            }
        }), null, (err, stats)=>{
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks: false
            }))
        })
        .pipe(gulp.dest(['server/public/js']))
        .pipe(rename({
            basename: 'cp',
            extname: '.min.js'
        }))
        .pipe(uglify({
            compress: {properties: false},
            output: {quote_keys: true}
        }))
        .pipe(gulp.dest(['server/public/js']))
        .pipe(gulpif(args.watch, livereload()))
})