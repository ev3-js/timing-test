var fs = require('fs')

module.exports = streamDevice

function streamDevice (path) {
  this.path = path
}

streamDevice.prototype.write = function (prefix, cmd, cb) {
  return fs.writeFile(this.path + '/' + prefix, cmd, cb)
}

streamDevice.prototype.read = function (prop, cb) {
  return fs.createReadStream(this.path + '/' + prop, 'utf-8')
}
