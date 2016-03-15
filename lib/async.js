var devices = require('ev3-js-devices')
var AsyncDevice = require('./asyncDevice')
var Device = require('ev3-js-device')

function readDataAsync (cb) {
  var motor = new AsyncDevice(devices('c'))
  var motor2 = new AsyncDevice(devices('b'))
  var ir = new AsyncDevice(devices(1))
  var sonic = new AsyncDevice(devices(2))
  var touch = new AsyncDevice(devices(3))
  var color = new AsyncDevice(devices(4))
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

function readDataSync () {
  var motor = new Device(devices('c'))
  var motor2 = new Device(devices('b'))
  var ir = new Device(devices(1))
  var sonic = new Device(devices(2))
  var touch = new Device(devices(3))
  var color = new Device(devices(4))
  motor.read('position')
  motor2.read('position')
  ir.read('value0')
  sonic.read('value0')
  touch.read('value0')
  color.read('value0')
}

function test () {
  console.time('async')
  readDataAsync(function (r) {
    if (r.length === 6) {
      console.timeEnd('async')
      console.log(r)
    }
  })
  console.time('sync')
  readDataSync()
  console.timeEnd('sync')
}

test()
