const router = require('express').Router()
const {
  createEducation,
  getAllEducation,
  getOneEducation,
  updateEducation,
  deleteEducation,
} = require('../controllers/education.controllers')

router
  .post('/', createEducation)
  .get('/', getAllEducation)
  .get('/:id', getOneEducation)
/*   .patch('/:id', updateEducation)
  .delete('/:id', deleteEducation) */

module.exports = router
