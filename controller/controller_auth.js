'use strict'

const User = require('../schemas/user')
const service = require('../services')
const bcrypt=require('bcrypt-nodejs')


function signUp (req, res) {
  bcrypt.genSalt(10,(err,salt)=>{
    if(err) res.status(500).send({message:err})

    bcrypt.hash(req.body.password,salt,null,(err,hash)=>{
      if (err) res.status(500).send({message:err})

          const user = new User({
               email: req.body.email,
               displayName: req.body.displayName,
               password: hash
           })

         user.save((err) => {
           if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

     return res.status(201).send({message: user,
          token: service.createTokenUser(user) })
     })
    })

  })
 
}

function signIn (req, rest) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return rest.status(500).send({ message: err })
    if (user.isEmpty) return rest.status(404).send({ message2: 'No existe el usuario' })
console.log(user)
bcrypt.compare(req.body.password, user[0].password, function(err, res) {
   if (err) return rest.status(500).send({ message: err })
    if(res){
        req.user = user
        rest.status(200).send({
              token: service.createTokenUser(user[0])
        })
    }else{
        rest.status(403).send({message:'contraseña incorrecta'})
    }
   
})
    
  })
}

module.exports = {
  signUp,
  signIn
}