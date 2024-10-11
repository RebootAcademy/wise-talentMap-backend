const router = require('express').Router()
const {
  createLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
  getOneLocation,
} = require('../controllers/location.controllers')

router
  .post('/', createLocation)
  .get('/', getAllLocations)
  .get('/:id', getOneLocation)
  .patch('/:id', updateLocation)
  .delete('/:id', deleteLocation)

module.exports = router
