const fs = require('fs')
const path = require('path')
const glob = require('glob')

let resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

let getEntries = (globPaths) => {
  let [files, entries] = [[], {}]

  globPaths.forEach((path) => {
    let tmpFiles = glob.sync(path)
    files = [...files, ...tmpFiles]
  })

  console.log('files', files)

  files.forEach(function (filepath) {
    let split = filepath.split('/')
    let name = ''
    for (let i = 2; i < split.length - 1; i++) {
      name += split[i] + '_'
    }
    name = name.slice(0, -1)
    entries[name] = './' + filepath
  })
  return entries
}

let routerName = 'index'
if(process.env.VUE_APP_RATIO === 'ratio41') {
  routerName = 'index41'
}


exports.exec = _ => {
  let pathUrls = []
  pathUrls.push(`src/views/**/**/${routerName}.vue`)

  let router = ''
  const entries = getEntries(pathUrls)

  Object.keys(entries).forEach(function (name) {
    const names = name.split('/')
    const chunkName = names[names.length - 1]
    const path = name.replace(/_/g, '/')
    router += `const ${name} = _ => import(/* webpackChunkName: '${chunkName}' */ 'views/${path}/${routerName}.vue')\n`
  })

  router += '\nexport default {\n'
  Object.keys(entries).forEach(function (name) {
    let path = name.replace(/_/g, '/')
    router += `  '/${path}': ${name},\n`
  })
  router = router.slice(0, -2)
  router += '\n}'

  let routerFile = `${resolve(`src/router.js`)}`

  fs.open(routerFile, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.log(`路由文件已经存在，准备替换掉旧的路由文件，文件原路径：${routerFile}`)
        fs.unlink(routerFile, (err) => {
          if (err) {
            console.log(`路由文件删除失败，错误信息：${JSON.stringify(err)}`)
            return false
          }
          console.log(`路由文件删除成功！`)
          console.log(`start generate src/router.js ...`)
          fs.writeFileSync(routerFile, router)
          console.log(`start generate src/router.js ...`)
        })
        return
      }
      throw err
    } else {
      console.log(`start generate src/router.js ...`)
      fs.writeFileSync(routerFile, router)
      console.log(`start generate src/router.js ...`)
    }
  })
}
