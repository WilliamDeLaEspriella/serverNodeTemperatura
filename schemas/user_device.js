const mongoose=require('mongoose')
const Schema=mongoose.Schema

const User_deviceSchema=new Schema({
	nombre:{type:String,lowercase:true},
	apellido:{type:String,lowercase:true},
	edad:{type:Number,default:1},
	historial: { type: Schema.ObjectId, ref: "Historial" } ,
	device: { type: Schema.ObjectId, ref: "Device" } 
})


module.exports= mongoose.model('User_device',User_deviceSchema)