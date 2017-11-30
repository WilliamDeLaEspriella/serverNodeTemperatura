'use strict'
const Historial=require('../schemas/Historial')
const Dato=require('../schemas/dato')

function getHistorial(req,res) {
	Historial.findById(req.body.id,(err,historial)=>{
		Dato.fid({_id:historial.dato},(err,datos)=>{
			res.status(200).send(datos)
		})

	})
}
function getHistorialFil(req,res) {
	Historial.findById(req.body.id,(err,historial)=>{
		
		Dato.find({_id:{$in:historial.dato}},(err,datos)=>{
			console.log(datos)
				var filtro=[]
				for (var i = datos.length - 1; i >= 0; i--) {
					if(datos[i].date.getMonth()==req.body.mes && datos[i].date.getFullYear()==req.body.year){
						filtro.push(datos[i])
					}
				}
			res.status(200).send(filtro)
		})

	})
}
module.exports={
	getHistorialFil,
	getHistorial
}