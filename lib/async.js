var devices = require('ev3-js-devices')
var AsyncDevice = require('./asyncDevice')
var motor = new AsyncDevice(devices('c'))
var motor2 = new AsyncDevice(devices('b'))
var ir = new AsyncDevice(devices(1))
var sonic = new AsyncDevice(devices(2))
var touch = new AsyncDevice(devices(3))
var color = new AsyncDevice(devices(4))


function readData (cb) {
  var responses = []
  motor.read('position', function () {
    responses.push('position')
    cb(responses)
  })
  motor2.read('position', function () {
    responses.push('position')
    cb(responses)
  })
  ir.read('value0', function () {
    responses.push('ir')
    cb(responses)
  })
  sonic.read('value0', function () {
    responses.push('ir')
    cb(responses)
  })
  touch.read('value0', function () {
    responses.push('ir')
    cb(responses)
  })
  color.read('value0', function () {
    responses.push('ir')
    cb(responses)
  })
}

function test () {
  console.time('async')
  readData(function (r) {
    if (r.length === 6) {
      console.timeEnd('async')
    }
  })
}

test()
