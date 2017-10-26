'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema


const deviceSchema=Schema({
	name:{type:String, unique:true},
	password:{type:String},
	linked:{type:String,enum:['yes','no'],default:"no"},
	dato: { type: Schema.ObjectId, ref: "Dato" } 
})

module.exports = mongoose.model('Device',deviceSchema)