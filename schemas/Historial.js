'use strict'
const monggose=require('mongoose')
const Schema=mongoose.Schema


const  HistorialSchema= new Schema({
	dato: [type: Schema.ObjectId, ref: "Dato"] 
})

module.exports=mongoose.model('Historial',DatoSchema)