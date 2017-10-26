'use strict'

const services = require('../services')

function isAuthDevice (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }
  const token = req.headers.authorization.split(' ')[1]
  services.decodeToken(token)
    .then(response => {
     
      req.device = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}

module.exports = isAuthDevice