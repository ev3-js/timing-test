var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')
var motor = Device(devices('C'))

var runs = 100
var sum = 0

for (var i = 0; i < runs; i++) {
  var start = Date.now()
  motor.write('command', 'run-to-rel-pos')
  sum += Date.now() - start
}

console.log('average: ', sum / runs)
