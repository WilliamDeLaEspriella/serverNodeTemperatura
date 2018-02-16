 'use strict'
const express=require('express')
const DeviceCtrl =require('../controller/controller_device')
const auth = require('../middlewares/auth')

const apiDevice= express.Router()

apiDevice.get('/device',auth,DeviceCtrl.getDevice)

apiDevice.post('/createDevice',auth,DeviceCtrl.postDevice)

apiDevice.delete('/deviceRemove',auth,DeviceCtrl.removeDevice)
apiDevice.post('/editUserDevice',auth,DeviceCtrl.editUserDevice)
apiDevice.post('/DataDevice',DeviceCtrl.putDevice)
apiDevice.get('/:name/:temperatura',DeviceCtrl.putDevice2)

apiDevice.put('/all',DeviceCtrl.getUSerDevice)

module.exports= apiDevice
