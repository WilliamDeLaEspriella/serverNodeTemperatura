'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema


const UserSchema=new Schema({
	email:{type:String,unique:true,lowercase:true},
	displayName:String,
	password:{type:String},
	user_devices: [{type: Schema.ObjectId, ref: "User_device" } ],
	token:[]
})

module.exports= mongoose.model('User',UserSchema)