var devices = require('ev3-js-devices')
var AsyncDevice = require('./asyncDevice')
var Device = require('ev3-js-device')
var StreamDevice = require('./streamDevice')
var http = require('http')

var motor = new AsyncDevice(devices('c'))
var motor2 = new AsyncDevice(devices('b'))
var ir = new AsyncDevice(devices(1))
var sonic = new AsyncDevice(devices(2))
var touch = new AsyncDevice(devices(3))
var color = new AsyncDevice(devices(4))
var motorSync = new Device(devices('c'))
var motor2Sync = new Device(devices('b'))
var irSync = new Device(devices(1))
var sonicSync = new Device(devices(2))
var touchSync = new Device(devices(3))
var colorSync = new Device(devices(4))
var motorStream = new StreamDevice(devices('c'))
var motor2Stream = new StreamDevice(devices('b'))
var irStream = new StreamDevice(devices(1))
var sonicStream = new StreamDevice(devices(2))
var touchStream = new StreamDevice(devices(3))
var colorStream = new StreamDevice(devices(4))

function readDataAsync (cb) {
  console.time('read async')
  var responses = []
  motor.read('position', function () {
    responses.push(0)
    cb(responses)
  })
  motor2.read('position', function () {
    responses.push(0)
    cb(responses)
  })
  ir.read('value0', function () {
    responses.push(0)
    cb(responses)
  })
  sonic.read('value0', function () {
    responses.push(0)
    cb(responses)
  })
  touch.read('value0', function () {
    responses.push(0)
    cb(responses)
  })
  color.read('value0', function () {
    responses.push(0)
    cb(responses)
  })
}

function writeDataAsync (cb) {
  console.time('write async')
  var responses = []
  motor.write('command', 'run-forever', function () {
    responses.push(0)
    cb(responses)
  })
  motor2.write('command', 'run-forever', function () {
    responses.push(0)
    cb(responses)
  })
  ir.write('mode', 'IR_SEEK', function () {
    responses.push(0)
    cb(responses)
  })
  sonic.write('mode', 'US_DIST_CM', function () {
    responses.push(0)
    cb(responses)
  })
  touch.write('mode', 'TOUCH', function () {
    responses.push(0)
    cb(responses)
  })
  color.write('mode', 'COL_REFLECT', function () {
    responses.push(0)
    cb(responses)
  })
}

function readDataStream (cb) {
  var responses = []
  var streams = []
  console.time('read stream')
  streams.push(motorStream.read('position'))
  streams.push(motor2Stream.read('position'))
  streams.push(irStream.read('mode'))
  streams.push(sonicStream.read('mode'))
  streams.push(touchStream.read('mode'))
  streams.push(colorStream.read('mode'))
  streams.forEach(function (stream) {
    stream.on('data', function (data) {
      responses.push(0)
      cb(responses)
    })
  })
}

function readDataSync () {
  var responses = []
  responses.push(motorSync.read('position'))
  responses.push(motor2Sync.read('position'))
  responses.push(irSync.read('value0'))
  responses.push(sonicSync.read('value0'))
  responses.push(touchSync.read('value0'))
  responses.push(colorSync.read('value0'))
  return responses
}

function writeDataSync () {
  console.time('write sync')
  var responses = []
  responses.push(motorSync.write('command', 'run-forever'))
  responses.push(motor2Sync.write('command', 'run-forever'))
  responses.push(irSync.write('mode', 'IR-SEEK'))
  responses.push(sonicSync.write('mode', 'US-DIST-CM'))
  responses.push(touchSync.write('mode', 'TOUCH'))
  responses.push(colorSync.write('mode', 'COL-REFLECT'))
  console.timeEnd('write sync')
  return responses
}

function test () {
  setInterval(sync, 100)
}

function sync () {
  console.time('sync')
  readDataSync()
  console.timeEnd('sync')
}

http.createServer(function () {
  test()
}).listen(5000)
