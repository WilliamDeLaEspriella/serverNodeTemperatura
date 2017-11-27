'use strict'
const User=require('../schemas/user')
const Device = require('../schemas/device')
const UserDevice=require('../schemas/user_device')


function agregar_userDevice(req,res){
	let userDevice =new UserDevice()
	userDevice.nombre=req.body.nombre  
	userDevice.apellido=req.body.apellido
	userDevice.edad=req.body.edad
	userDevice.save((err,EuserDevice)=>{
		if(err) res.status(500).json(`error al crear el usuario de dispocitivo ${err}`)
			User.findById(req.user,(err,user)=>{
				if(err)if(err) res.status(500).json(`error al vincular usuario  ${err}`)
						console.log(req.user)
						user.user_devices.push(userDevice)
	    				
						user.save((err,users)=>{
							if(err)  res.status(500).json(`Error al realizar la peticion: ${err}` )
							res.status(200).json('USUARIO AGREGADO EXITOSO.')
						})

			})
	})
}
function obtener_userDevice(req,res){
	User.findById(req.user,(err,user)=>{ 
		if(err)  res.status(500).json(`Error al realizar la peticion: ${err}`)
		UserDevice.find({_id:{$in:user.user_devices}},(err,userDevices)=>{
			if(err)  res.status(500).json(`Error al realizar la peticion: ${err}` )
				res.status(200).json(userDevices)
			console.log(userDevices)
			
				
		})
	})
}
function modifica_userDevice(req,res){}
function getUserDevice(req,res){

	UserDevice.find({},(err,users)=>{
		if(err)  res.status(500).send({menssage:`Error al realizar la peticion: ${err}` })
	    if(!users)  res.status(484).send({menssage:`el device no existe`})
		res.status(200).send(users);
		/*UserDevice.populate(User, {path: "user_devices"},function(err, devices){
        	res.status(200).send(devices);
        });*/
	})

}
module.exports={
	agregar_userDevice,
	obtener_userDevice,
	getUserDevice
}