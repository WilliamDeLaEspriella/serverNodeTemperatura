'use strict'

const User = require('../schemas/user')
const fcm = require('../services/fcmTopic')
const service = require('../services')
const bcrypt=require('bcrypt-nodejs')


function signUp (req, res) {
  
  bcrypt.genSalt(10,(err,salt)=>{
    if(err) res.status(503).send({message:err})

    bcrypt.hash(req.body.password,salt,null,(err,hash)=>{
      if (err) res.status(503).send({message:err})

          const user = new User({
               email: req.body.email,
               displayName: req.body.displayName,
               password: hash,
               token:req.body.token
           })

         user.save((err,user) => {
           if (err) return res.status(503).json(`Error al crear el usuario: ${err}` )
             console.log(user)
      res.status(200).json(service.createTokenUser(user))
     })
    })

  })
 
}

function signIn (req, rest) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return rest.status(500).send({ message: err })
    if (user.length == 0) return rest.status(203).json('Email no encontrado.' )

bcrypt.compare(req.body.password, user[0].password, function(err, res) {
   if (err) return rest.status(500).json(err)
    if(res){
        req.user = user
        if(function_name(user[0].token,req.body.token)){
           console.log(user)
            rest.status(200).json(service.createTokenUser(user[0]))
        }else{
           user[0].token.push(req.body.token)
          user[0].save((err,userx)=>{
              console.log(userx)
           fcm.enviarNotificaion(req.body.token,"inicio seccion")
           rest.status(200).json(service.createTokenUser(user[0]))
          
        })
        }
       
       
    }else{
        rest.status(203).json('contraseña incorrecta.')
    }
   
})
    
  })
}
function cambiarContraseña (req, rest) {
  bcrypt.genSalt(10,(err,salt)=>{
    if(err) res.status(503).send({message:err})
     bcrypt.hash(req.body.password,salt,null,(err,hash)=>{
      if (err) res.status(503).send({message:err})
      User.findByIdAndUpdate(req.user,{password:hash}, (err, user) => {
        if (err) return rest.status(500).send({ message: err })
        if (user == null) return rest.status(203).json('Email no encontrado.' )

          rest.status(200).json('Contraseña Cambiada')

             
      })

  })   
 })


}
function cerrarSesion(req,res) {
 User.findById(req.user,(err,user)=>{
    if (err) res.status(503).send({message:err})
     
    var index = user.token.indexOf(req.body.token);
     array.splice(index, 1);
       user.save((err,user)=>{
        if (err) return res.status(500).send({ message: err })
        rest.status(200).json('Gracias por Usar nuestra App')
       })
     })   
}

 function function_name(array,name) {
  for (var i = array.length - 1; i >= 0; i--) {
    if(array[i] == name){
      return true
    }
  }
  return false
}
module.exports = {
  signUp,
  signIn,
  cambiarContraseña,
cerrarSesion
}