'use strict'
const express=require('express')
const DeviceCtrl =require('../controller/controller_device')


const apiDevice= express.Router()

apiDevice.get('/device',DeviceCtrl.getDevice)

apiDevice.post('/deviceDatos',DeviceCtrl.datosDevice)

apiDevice.post('/deviceLinked',DeviceCtrl.linkedDevice)



module.exports= apiDevice