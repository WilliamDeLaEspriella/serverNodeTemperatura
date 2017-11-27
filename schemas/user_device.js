const mongoose=require('mongoose')
const Schema=mongoose.Schema

const User_deviceSchema=new Schema({
	nombre:{type:String,lowercase:true},
	apellido:{type:String,lowercase:true},
	dato:{type:String,default:"37"},
	edad:{type:String,default:"1"},
	historial: { type: Schema.ObjectId, ref: "Historial" } ,
	device: { type: String, default:"Ninguno" } 
})


module.exports= mongoose.model('User_device',User_deviceSchema)