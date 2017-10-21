'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema


const deviceSchema=Schema({
	name:String,
	password:String,
	linked:{type:String,enum:['yes','no'],default:"no"},
	temperatura:{type:Number,default:0.0},
	 user: { type: Schema.ObjectId, ref: "User" } 
})

module.exports = mongoose.model('Device',deviceSchema)