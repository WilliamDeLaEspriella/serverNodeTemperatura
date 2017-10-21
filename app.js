'use strict'

const express=require('express')
const  bodyParser=require('body-parser')
const app=express()
const apiDevice=require('./routes/route_device')


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use( '/control',apiDevice)

module.exports=app   
