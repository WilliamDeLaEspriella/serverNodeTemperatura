'use strict'
const express=require('express')
const AuthCtrl =require('../controller/controller_auth')
const UserCtrl =require('../controller/controller_user')
const auth = require('../middlewares/auth')

const apiAuth= express.Router()

apiAuth.post('/signUp',AuthCtrl.signUp)
apiAuth.post('/user',UserCtrl.getUserDevice)
apiAuth.post('/signIn',AuthCtrl.signIn)
apiAuth.post('/agregarUserDevice',auth,UserCtrl.agregar_userDevice)
module.exports= apiAuth