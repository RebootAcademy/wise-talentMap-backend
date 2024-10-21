const router = require('express').Router()
const  isAuth  = require('../middlewares/isAuth')
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
  .post('/', isAuth, createUser)
  .get('/', getAllUsers)
  .get('/sector', getUsersBySector)
  .get('/steam/:steam', getUserBySteamArea)
  .get('/location/:location', getUsersByLocation)
  .get('/education/:education', getUsersByEducation)
  .get('/:id', getOneUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser)

module.exports = router