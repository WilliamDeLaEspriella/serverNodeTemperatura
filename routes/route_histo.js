'use strict'
const express=require('express')
const DeviceCtrl =require('../controller/controller_historial')
const auth = require('../middlewares/auth')
const apiDevice= express.Router()

apiDevice.post('/histo',DeviceCtrl.getHistorialFil)

module.exports= apiDevice
