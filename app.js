'use strict'

const express=require('express')
const  bodyParser=require('body-parser')
const app=express()
const apiDevice=require('./routes/route_device')
const apiUser=require('./routes/route_user')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use( '/control',apiDevice)
app.use( apiUser)

module.exports=app   
