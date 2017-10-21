'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt=require('bcrypt-nodejs')
const crypto=require('crypto')

const UserSchema=new Schema({

	email:{type:String,unique:true,lowercase:true},
	displayName:String,
	password:{type:String,select:false},
	signupDate:{type:Date,default:Date.now()}
})


module.exports= mongoose.model('User',UserSchema)