var fs = require('fs')

module.exports = asyncDevice

function asyncDevice (path) {
  this.path = path
}

asyncDevice.prototype.write = function (prefix, cmd, cb) {
  return fs.writeFile(this.path + '/' + prefix, cmd, cb)
}

asyncDevice.prototype.read = function (prop, cb) {
  return fs.readFile(this.path + '/' + prop, 'utf-8', cb)
}
