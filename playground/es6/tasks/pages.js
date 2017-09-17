/**
 * Created by Administrator on 2017/9/17.
 */
import gulp from 'gulp'
import gulpif from 'gulp-if'             // if判断
import livereload from 'gulp-livereload' // 热加载
import args from './util/args'           // 对命令行做解析

// 创建任务 - 处理模板文件
gulp.task('pages', ()=>{
    return gulp.src(['app/**/*.ejs'])
        .pipe(gulp.dest(['server']))
        .pipe(gulpif(args.watch, livereload()))
})