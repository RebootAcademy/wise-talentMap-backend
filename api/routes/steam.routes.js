const router = require('express').Router()
const {
  createSteam,
  getAllSteams,
  getOneSteam,
  updateSteam,
  deleteSteam
} = require('../controllers/steam.controller')

router
    .post('/', createSteam)
    .get('/', getAllSteams)
    .get('/:id', getOneSteam)
/*     .patch('/:id', updateSteam)
    .delete('/:id', deleteSteam) */

module.exports = router
