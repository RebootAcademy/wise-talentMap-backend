const router = require('express').Router()
const { 
    createUser,
    getAllUsers,
    getUsersBySector,
    getUsersByLocation,
    getUsersByEducation,
    getOneUser,
    updateUser,
    deleteUser,
    getUserBySteamArea
 } = require('../controllers/user.controllers')


router
  .post('/', createUser)
  .get('/', getAllUsers)
  .get('/sector', getUsersBySector)
  .get('/steam/:steam', getUserBySteamArea)
  .get('/location/:location', getUsersByLocation)
  .get('/education/:education', getUsersByEducation)
  .get('/:id', getOneUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser)

module.exports = router