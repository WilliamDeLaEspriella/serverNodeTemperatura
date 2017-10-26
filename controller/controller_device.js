'use strict'

const Device=require('../schemas/device')
const Dato=require('../schemas/dato')
const User=require('../schemas/user')
const service = require('../services')
const UserDevice=require('../schemas/user_device')


function getDevice(req,res){

	Device.find({},(err,users) =>{
	if(err) res.status(500).send("se exploto esta wea")
		res.status(200).send({users})

	})

} 
function getUSerDevice(req,res){

	UserDevice.find({},(err,users) =>{
	if(err) res.status(500).send("se exploto esta wea")
		//res.status(200).send({users})
	Device.populate(users, {path: "device"},function(err, devices){
        	res.status(200).send(devices);
        });

	})

} 

function postDevice(req,res){
	UserDevice.findById(req.body.id,(err,userDevice)=>{
		if(err){res.status(500).send(`error al buscar los datos del dispocitivo: ${err}`)}
		console.log(userDevice)
		if(userDevice==null){
			res.status(403).send(`Usuario no existente`)
		}else{
		const dato=new Dato()
		const device=new Device()
		 device.name=req.body.name
	 	device.password=req.body.password
	 	device.dato=dato
	 	dato.save((err,Edato)=>{
	 		if(err){res.status(500).send(`los datos del dipocitivo no pudieron ser guardados: ${err}`)}
	 	})
	 	device.save((err, Edevice)=>{
	 		if(err){
	 			dato.remove(dato._id,(err,Rdevice)=>{})
	 			res.status(500).send(`los datos del dipocitivo no pudieron ser guardados: ${err}`)}
	 		
			linkedUser(device._id,req,res)
	 		//res.status(500).send(`error al guardar el dispocitivo ${err}`)
	 })	 
		}
	})

	
}

function putDevice(req,res){
	let update=req.body
	Device.find({name:req.device},(err,devices)=>{
		if(err) res.status(500).send({message:`error al actualizar el device: ${err}`})	
		Dato.findByIdAndUpdate(devices[0].dato,update,(err,deviceUpdate)=>{
				if(err) res.status(500).send({message:`error al actualizar el device: ${err}`})	

			res.status(200).send({message:"actualizado con exito"})

		})

	})
	

}
function removeDevice(res ,req){
	let id=req.body.id
	Device.find({name:id},(err,devices)=>{
		if(err) res.status(500).send({message:`error al remove el device: ${err}`})	
	
	res.status(200).send({message:"removido con exito"})
	})
}

function linkedUser(id_d,req,res){

		UserDevice.findByIdAndUpdate(req.body.id,{$set:{device:id_d}},(err,deviceUpdate)=>{
			if(err) res.status(500).send({message:`error al actualizar el device: ${err}`})	
			
			res.status(200).send({message:"actualizado con exito"})
		})
}

function linkedDevice(req,res){
	let nameDevice=req.body.name
	Device.find({name:nameDevice},(err,devices)=>{
		if(err) res.status(500).send("error al vincular")
			//res.status(200).send(devices)
			if(devices.length == 0){
				res.status(403).send("device no vinculado")
			}else{
 				req.device = devices
       		 	res.status(200).send(service.createTokenDevice(devices[0]))
			}
	})
}
   
module.exports={
	getDevice,
	postDevice,
	putDevice,
	removeDevice,
	linkedDevice,
	getUSerDevice
}