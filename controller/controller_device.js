'use strict'

const Device=require('../schemas/device')
const Dato=require('../schemas/dato')
const User=require('../schemas/user')
const service = require('../services')
const UserDevice=require('../schemas/user_device')
const fcm = require('../services/fcmTopic')
const Historial=require('../schemas/Historial')

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
	Device.find({name:req.body.name},(err,body)=>{{
		if(err){res.status(500).json(`error al buscar los datos del dispocitivo: ${err}`)}
			console.log(body)
					if(body.length == 0){
						functionX(req,res)
					}else{
						UserDevice.find({device:body[0].name},(err,array)=>{
							console.log(array.length)
							if(array.length > 0){
								res.status(203).json("Este Dicpocitivo ya esta anclado a un usuario")
							}else{
								UserDevice.findById(req.body.id,(err,userDevice)=>{
									if(err){res.status(500).json(`error al buscar los datos del dispocitivo: ${err}`)}
							
									if(userDevice==null){
										res.status(403).json('Usuario no existente')
									}else{  
												UserDevice.findByIdAndUpdate(req.body.id,{$set:{device:req.body.name}},(err,deviceUpdate)=>{
														if(err) res.status(500).json(`error al actualizar el device: ${err}`)	
														console.log(deviceUpdate)
														res.status(200).json('anclado con exito')
												})		 		
											

										
									}
								})

							} 	
						})

					} 	
				

	}})

	
}
function functionX(req,res) {
		UserDevice.findById(req.body.id,(err,userDevice)=>{
			if(err){res.status(500).json(`error al buscar los datos del dispocitivo: ${err}`)}
							
			if(userDevice==null){
				res.status(403).json('Usuario no existente')
			}else{  
				const dato=new Dato()
				const device=new Device()
					device.name=req.body.name
					device.dato=dato
				dato.save((err,Edato)=>{
					if(err){res.status(500).json(`los datos del dipocitivo no pudieron ser guardados: ${err}`)}
							 	
					device.save((err, Edevice)=>{
						if(err){
							dato.remove(dato._id,(err,Rdevice)=>{})
							res.status(500).json(`los datos del dipocitivo no pudieron ser guardados: ${err}`)}
						 
						UserDevice.findByIdAndUpdate(req.body.id,{$set:{device:req.body.name}},(err,deviceUpdate)=>{
								if(err) res.status(500).json(`error al actualizar el device: ${err}`)	
								console.log(deviceUpdate)
								res.status(200).json('anclado con exito')
						})		 		
					})	

				})
			}
		})
}

function putDevice(req,res){

	let nameDevice=req.body.name
	UserDevice.find({device:nameDevice},(err,devices)=>{
		if(err) {res.status(500).json("error al vincular")
			}else{
				if(devices.length == 0){
					res.status(403).json("device no vinculado")
				}else{
					console.log(devices)	
					Device.find({name:devices[0].device},(err,device)=>{
						if(err) res.status(500).json(`error al actualizar el device: ${err}`)	
					  	
					  	Dato.findByIdAndUpdate(device[0].dato,{$set:{temperatura:req.body.temperatura}},(err,deviceUpdate)=>{
								if(err) res.status(500).json(`error al actualizar el device: ${err}`)	
									User.find({user_devices:devices[0]._id},(err,user)=>{
												if(err) res.status(500).json(`error al actualizar el device: ${err}`)
												UserDevice.findByIdAndUpdate(devices[0]._id,{$set:{dato:req.body.temperatura}},(err,update)=>{
													if(err) res.status(500).json(`error al actualizar el device: ${err}`)
														
														let dato=new Dato()
														dato.temperatura= req.body.temperatura
														dato.save((err,ds)=>{
															if(err) res.status(500).json(`error al actualizar el device: ${err}`)
														
															Historial.findById(update.historial,(err,Historials)=>{
															if(err) res.status(500).json(`error al actualizar el device: ${err}`)
															Historials.dato.push(dato)
															Historials.save((err,histo)=>{
															
																notificacion(user[0].token,req.body.temperatura,devices[0]._id)
																res.status(200).json("actualizado")	
															})
														})
														})
														
													})

												//console.log(deviceUpdate)	
												//console.log(userDevice)	
												
											})
									
						

						})
					})
						
					
				}
			}
			//res.status(200).send(devices)
			
	})
	
	
   
}

function removeDevice(res ,req){
	let id=req.body.id
	Device.find({name:id},(err,devices)=>{
		if(err) res.status(500).send({message:`error al remove el device: ${err}`})	
	
	res.status(200).send({message:"removido con exito"})
	})
}


   function notificacion(argument,date,user) {
   		for (var i = argument.length - 1; i >= 0; i--) {
   			fcm.enviarData(argument[i],date,user)
   		}
   }

 function putDevice2(req,res){

	let nameDevice=req.params.name
	UserDevice.find({device:nameDevice},(err,devices)=>{
		if(err) {res.status(500).json("error al vincular")
			}else{
				if(devices.length == 0){
					res.status(403).json("device no vinculado")
				}else{
					console.log(devices)	
					Device.find({name:devices[0].device},(err,device)=>{
						if(err) res.status(500).json(`error al actualizar el device: ${err}`)	
					  	
					  	Dato.findByIdAndUpdate(device[0].dato,{$set:{temperatura:req.params.temperatura}},(err,deviceUpdate)=>{
								if(err) res.status(500).json(`error al actualizar el device: ${err}`)	
									User.find({user_devices:devices[0]._id},(err,user)=>{
												if(err) res.status(500).json(`error al actualizar el device: ${err}`)
												UserDevice.findByIdAndUpdate(devices[0]._id,{$set:{dato:req.params.temperatura}},(err,update)=>{
													if(err) res.status(500).json(`error al actualizar el device: ${err}`)
														let dato=new Dato()
														dato.temperatura= req.params.temperatura
														dato.save((err,ds)=>{
															Historial.findById(update.historial,(err,Historials)=>{
															Historials.dato.push(dato)
															Historials.save((err,histo)=>{

																notificacion(user[0].token,req.params.temperatura,devices[0]._id)
																res.status(200).json("actualizado")

															})
														})
														})
														

												})

												//console.log(deviceUpdate)	
												//console.log(userDevice)	
												
											})
									
						

						})
					})
						
					
				}
			}
			//res.status(200).send(devices)
			
	})
	
}
module.exports={
	getDevice,
	postDevice,
	putDevice,
	putDevice2,
	removeDevice,
	getUSerDevice
}