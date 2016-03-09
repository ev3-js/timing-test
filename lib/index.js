var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')
var motor = new Device(devices('C'))

var runs = 100

test('write', 'command', 'run-to-rel-pos')
test('read', 'commands')

function test (type, ext, cmd) {
  var sum = 0

  for (var i = 0; i < runs; i++) {
    var start = Date.now()
    motor[type](ext, cmd)
    sum += Date.now() - start
  }

  console.log(type + ': ' + (sum / runs))
}
