const router = require('express').Router()
const { createLocation, getAllLocations, updateLocation } = require('../controllers/location.controllers')


router
    .post('/', createLocation)
    .get('/', getAllLocations)
    .patch('/:id', updateLocation)

module.exports = router