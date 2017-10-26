'use strict'
const Device=require('../schemas/device')
const User=require('../schemas/user')
/*
function linkedDevice(req,res){


} 
/*registramos dispocitivo en la base de datos*/

function postDevice(req,res){
console.log(req.body)
	let user=new User();
	user.email="DSS"
	user.displayName="asdedad"
	user.password="Zsdsdv"

	let device=new Device()
	device.name= req.body.name
	device.password=req.body.password
	device.temperatura=req.body.temperatura
	device.user=user;
	user.save((err,deviceStored)=>{
	device.save((err,deviceStored)=>{
		if(err){

			res.status(500).send(`error al salvar el dispocitivo en al base de datos: ${err}`)
		}console.log(device)
		res.status(200).send(device._id)
	})	
	})
	
	
} 



/*recibir datos dispocitivo
	id=String type["vacio",id]
	name=string
	password=string
	temperatura=double
*/
function datosDevice(req,res){

	let  id = req.body.id
	if(id=="vacio"){
		postDevice(req,res);
	}else{
		putDevice(req,res);
	}	
} 
function putDevice(req,res){
let deviceId=req.body.id
	let update=req.body

	Device.findByIdAndUpdate(deviceId,update,(err,deviceUpdate)=>{
		if(err) res.status(500).send({message:`error al actualizar el device: ${err}`})

			res.status(200).send("Update")

	})
	
} 

 function getDevice(req,res){
	//Device.find({},(err,devices)=>{

User.find({_id:req.user},(err,users) =>{
 if(err) res.status(500).send("se exploto esta wea")
res.status(200).send({users})


}).
/*		if(err) return res.status(500).send({menssage:`Error al realizar la peticion: ${err}` })
	    if(!devices) return res.status(484).send({menssage:`el device no existe`})
	res.status(200).send({devices})
User.populate(devices, {path: "user"},function(err, devices){
        	res.status(200).send(devices);
        });
	})
*/
} 

module.exports={
	getDevice,
	linkedDevice,
	datosDevice
}