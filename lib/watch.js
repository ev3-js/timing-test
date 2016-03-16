var fs = require('fs')
var http = require('http')

http.createServer(function (req, res) {
  var stream = fs.createReadStream('log.txt', 'utf-8')
  console.time('stream')
  stream.on('data', function (data) {
    console.log(data)
    console.timeEnd('stream')
  })
  console.time('readFile')
  fs.readFileSync('log.txt', 'utf-8')
  console.timeEnd('readFile')
}).listen(5000)
