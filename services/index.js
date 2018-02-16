'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')
const bcrypt=require('bcrypt-nodejs')

function createTokenUser (user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

function createTokenDevice (device) {
  const payload = {
    sub: device.name,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
     
      const payload = jwt.decode(token, config.SECRET_TOKEN)
 
      if (payload.exp <= moment().unix()) {   
        reject({status: 401,
          token:"El token ha expirado"})
      }
      resolve(payload.sub)
    } catch (err) {
      reject({
        status: 500,
        token:"Invalid Token"
      })
    }
  })

  return decoded
}
function criptContra(res,password){
 
}
module.exports = {
  createTokenUser,
  createTokenDevice,
  decodeToken,
  criptContra
}