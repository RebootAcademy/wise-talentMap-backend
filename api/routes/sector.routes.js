const router = require('express').Router()
const {
  createSector,
  getAllSectors,
  getOneSector,
  updateSector,
  deleteSector,
} = require('../controllers/sector.controllers')

router
  .post('/', createSector)
  .get('/', getAllSectors)
  .get('/:id', getOneSector)
 /*  .patch('/:id', updateSector)
  .delete('/:id', deleteSector) */

module.exports = router
