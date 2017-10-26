'use strict'
const express=require('express')
const DeviceCtrl =require('../controller/controller_device')
const auth = require('../middlewares/auth')
const authDevice = require('../middlewares/auth_device')

const apiDevice= express.Router()

apiDevice.get('/device',auth,DeviceCtrl.getDevice)

apiDevice.post('/createDevice',auth,DeviceCtrl.postDevice)

apiDevice.post('/deviceLinked',auth,DeviceCtrl.linkedDevice)

apiDevice.delete('/deviceRemove',auth,DeviceCtrl.removeDevice)

apiDevice.put('/DataDevice',authDevice,DeviceCtrl.putDevice)

apiDevice.put('/all',DeviceCtrl.getUSerDevice)

module.exports= apiDevice
