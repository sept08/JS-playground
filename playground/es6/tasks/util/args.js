// 引入node.js命令行框架
import yargs form 'yargs';

const args = yargs
  // 区分开发环境还是发布环境，默认开发环境
  .option('production',{
    boolean: true,
    default: false,
    describe: 'check prod or dev env'
  })
  // 监听文件变化
  .option('watch',{
    boolean: true,
    default: false,
    describe: 'watch all files'
  })
  // 是否详细输出命令行执行日志
  .option('verbose',{
    boolean: true,
    default: false,
    describe: 'log'
  })
  // 资源文件映射
  .option('sourcemaps',{
    describe: 'force the creation of sourcemaps'
  })
  // 服务器端口
  .option('port',{
    string: true,
    default: 8080,
    describe: 'server port'
  })
  // 对输入的命令行以字符串形式进行解析
  .argv
