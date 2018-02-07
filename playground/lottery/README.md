# update package.json
install `npm-check-updates` for checking and updating

## check all packages need to update
`ncu` 检查package.json中可供升级的依赖包

## update package
`ncu -u` 更新package.json中的依赖包列表，但并不更新`node_modules`中的依赖包内容

## update package content
`npm update` after update package.json