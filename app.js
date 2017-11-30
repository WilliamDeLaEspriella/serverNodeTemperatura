'use strict'

const express=require('express')
const  bodyParser=require('body-parser')
const app=express()
const apiDevice=require('./routes/route_device')
const apiUser=require('./routes/route_user')
const apiHisto=require('./routes/route_histo')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use( '/control',apiDevice)
app.use( apiUser)
app.use( apiHisto)

module.exports=app   
