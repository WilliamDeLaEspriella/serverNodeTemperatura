'use strict'

const mongoose=require('mongoose')
const app=require('./app')
const config=require('./config')
//connection.openUri
mongoose.Promise = global.Promise;
mongoose.connection.openUri(config.db,(err,res)=>{
	if(err){
		console.log(`error al conectar con la base de datos ${err}`)
	}
	console.log('conexion al base de datos establecisa')
app.listen(config.port,()=>{

console.log(`API REST corriendo en http//192.168.1.31:${config.port}`)	
	})
})
