'use strict'
const mongoose=require('mongoose')
const Schema=mongoose.Schema


const DatoSchema= new Schema({
	temperatura:{type:Number,default:0.0},
	date:{type:Date,default:Date.now()}
})

module.exports=mongoose.model('Dato',DatoSchema)