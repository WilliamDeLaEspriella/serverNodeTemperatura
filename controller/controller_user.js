'use strict'
const User=require('../schemas/user')
const UserDevice=require('../schemas/user_device')


function agregar_userDevice(req,res){
	let userDevice =new UserDevice()
	userDevice.nombre=req.body.nombre  
	userDevice.apellido=req.body.apellido
	userDevice.edad=req.body.edad
	userDevice.save((err,EuserDevice)=>{
		if(err) res.status(500).send({mesage:`error al crear el usuario de dispocitivo ${err}`})
			User.findById(req.user,(err,user)=>{
				if(err)if(err) res.status(500).send({mesage:`error al vincular usuario  ${err}`})
						console.log(req.user)
						user.user_devices.push(userDevice)
	    				
						user.save((err,users)=>{
							if(err) return res.status(500).send({menssage:`Error al realizar la peticion: ${err}` })


						})

			})
			res.status(200).send(EuserDevice)
	})
}
function obtener_userDevice(req,res){}
function modifica_userDevice(req,res){}
function getUserDevice(req,res){

	User.find({},(err,users)=>{
		if(err) return res.status(500).send({menssage:`Error al realizar la peticion: ${err}` })
	    if(!users) return res.status(484).send({menssage:`el device no existe`})
		res.status(200).send(users);
		/*UserDevice.populate(User, {path: "user_devices"},function(err, devices){
        	res.status(200).send(devices);
        });*/
	})

}
module.exports={
	agregar_userDevice,
	getUserDevice
}