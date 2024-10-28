const Location = require('../models/location.model')
const User = require('../models/user.model')
const Sector = require('../models/sector.model')
const Steam = require('../models/steam.model')
const Education = require('../models/education.model')

/**
 * Create a new User
 * @param {Object} req.body - The request body
 * @returns {Promise<Object>} The created User
 */
const createUser = async (req, res) => {
  try {
    let body = req.body
    const searchUser = await User.findOne({email: body.email})
    if (searchUser) {
      return res
        .status(409)
        .json({success: false, message: 'User already exists'})
    }

    const sectors = await Promise.allSettled(
      body.sectors.map(async (sector) => {
        const searchSector = await Sector.findOne({name: sector})
        if (searchSector) return searchSector._id
      })
    )

    const validSectors = sectors
      .filter(
        (result) => result.status === 'fulfilled' && result.value !== undefined
      )
      .map((result) => result.value)

    if (validSectors.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'There is an invalid Sector',
      })
    }

    let location

    if (body.location.type === 'Resto del mundo') {
      location = await Location.findOne({type: body.location.type, country: body.location.country, city: body.location.city})
    } else {
      location = await Location.findOne({type: body.location.type, island: body.location.island, municipality: body.location.municipality})
    }

     const steams = await Promise.allSettled(
       body.steam.map(async (steamName) => {
         const steamRecord = await Steam.findOne({name: steamName})
         return steamRecord ? steamRecord._id : null
       })
     )
     const validSteams = steams
       .filter(
         (result) => result.status === 'fulfilled' && result.value !== null
       )
       .map((result) => result.value)

     if (validSteams.length === 0) {
       return res.status(404).json({
         success: false,
         message: 'There is an invalid Steam',
       })
     }

    const educationLevel = await Education.findOne({
      name: body.educationalLevel,
    })

    if (!location) {
      location = await Location.create(body.location)
    }

    if (!educationLevel) {
      return res.status(404).json({
        success: false,
        message: 'Education not found',
      })
    }

    body = {
      ...body,
      sectors: validSectors,
      location: location._id,
      steam: validSteams,
      educationalLevel: educationLevel._id,
    }

    const user = new User(body)
    await user.save()
    res.status(201).json({
      success: true,
      description: 'User created successfully',
      result: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating User',
      error: error.message,
    })
  }
}

/**
 *  Get all users
 * @param {*} req.query - query to filter users
 * @param {*} res
 * @returns 
 */
const getAllUsers = async (req, res) => {
  try {
    const query = req.query || {}
    const users = await User.find(query).populate(
      'location sectors educationalLevel'
    )
    res.status(200).json({
      success: true,
      description: 'Users retrieved successfully',
      result: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving Users',
      error: error.message,
    })
  }
}

/**
 *  Get users by sector
 * @param {*} req.query sectors:['sector1', 'sector2'] Ex: {{baseURL}}/users/sector?sectors=Autónoma,Institución%20educativa
 * @param {*} res 
 * @returns 
 * 
 * The sectors must be the exact name of the sectors in the database. * 
 * If the sectors are not valid, it will return a 404 status with a message "There is an invalid Sector"
 * If the sectors are valid, it will return a 200 status with the users filtered by the sectors
 * 
 */
const getUsersBySector = async (req, res) => {
  try {
    const sectors = req.query.sectors

    if (!sectors) {
      return res.status(404).json({
        success: false,
        message: 'Not sectors provided',
      })
    }

   const sectorsArray = Array.isArray(sectors) 
      ? sectors.map(sector => decodeURIComponent(sector)) 
      : sectors.split(',').map(sector => decodeURIComponent(sector))


      console.log(sectorsArray)
    
    const searchSectors = await Promise.allSettled(
      sectorsArray.map(async (sector) => {
        const matchSector = await Sector.findOne({name: sector})
        if (matchSector) return matchSector._id
      })
    )

    const validSectors = searchSectors
      .filter(
        (result) => result.status === 'fulfilled' && result.value !== undefined
      )
      .map((result) => result.value)

    if (validSectors.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'There is an invalid Sector',
      })
    }

    const users = await User.find({sectors: {$in: validSectors}}).populate(
      'sectors location educationalLevel'
    )
    res.status(200).json({
      success: true,
      description: 'Users retrieved successfully',
      result: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving Users with sectors',
      error: error.message,
    })
  }
}

/**
 *  Get users by steam area
 * @param {*} req.params.steam - name of the steam area
 * @param {*} res
 * @returns 
 * 
 * The steam area must be the exact name of the steam area in the database. * 
 * If the steam area is not valid, it will return a 404 status with a message "Steam not found"
 * If the steam area is valid, it will return a 200 status with the users filtered by the steam area
 * 
 */
const getUserBySteamArea = async (req, res) => {
  try {
    const steam = req.params.steam

    const searchSteam = await Steam.findOne({name: steam})
    if (!searchSteam) {
      return res.status(404).json({
        success: false,
        message: 'Steam not found',
      })
    }

    const users = await User.find({steam: searchSteam._id}).populate(
      'sectors location educationalLevel'
    )
    res.status(200).json({
      success: true,
      description: 'Users retrieved successfully',
      result: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving Users with sectors',
      error: error.message,
    })
  }
}

/**
 *  Get users by location
 * @param {*} req.params.location - name of the location
 * @param {*} res
 * @returns 
 * 
 * The location must be the exact name of the location in the database. * 
 * If the location is not valid, it will return a 404 status with a message "Location not found"
 * If the location is valid, it will return a 200 status with the users filtered by the location
 * 
 */
const getUsersByLocation = async (req, res) => {
  try {
    const location = req.params.location

    console.log(location)
    const searchLocation = await Location.findOne({name: location})

    if (!searchLocation) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      })
    }

    const users = await User.find({location: searchLocation._id}).populate(
      'sectors location educationalLevel'
    )
    res.status(200).json({
      success: true,
      description: 'Users retrieved successfully',
      result: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving Users with sectors',
      error: error.message,
    })
  }
}

/**
 *  Get users by education
 * @param {*} req.params.education - name of the education
 * @param {*} res
 * @returns 
 * 
 * The education must be the exact name of the education in the database. * 
 * If the education is not valid, it will return a 404 status with a message "Education not found"
 * If the education is valid, it will return a 200 status with the users filtered by the education
 * 
 */
const getUsersByEducation = async (req, res) => {
  try {
    const education = req.params.education
    const searchEducation = await Education.findOne({name: education})
    if (!searchEducation) {
      return res.status(404).json({
        success: false,
        message: 'Education not found',
      })
    }
    const users = await User.find({
      educationalLevel: searchEducation._id,
    }).populate('sectors location educationalLevel')
    res.status(200).json({
      success: true,
      description: 'Users retrieved successfully',
      result: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving Users with sectors',
      error: error.message,
    })
  } 
}

/**
 *  Get one user by id
 * @param {*} req.params.id - id of the user
 * @param {*} res
 * @returns 
 * 
 * The id must be the exact id of the user in the database. * 
 * If the id is not valid, it will return a 404 status with a message "User not found"
 * If the id is valid, it will return a 200 status with the user
 * 
 */
const getOneUser = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id).populate(
      'location sectors educationalLevel'
    )
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
    res.status(200).json({
      success: true,
      description: 'User retrieved successfully',
      result: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    })
  }
}

/**
 *  Update a user
 * @param {*} req.params.id - id of the user
 * @param {*} req.body - the new data of the user
 * @param {*} res
 * @returns 
 * 
 * The id must be the exact id of the user in the database. * 
 * If the id is not valid, it will return a 404 status with a message "User not found"
 * If the id is valid, it will return a 200 status with the updated user
 * 
 */
const updateUser = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndUpdate(id, req.body, {new: true})
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
    res.status(200).json({
      success: true,
      description: 'User updated successfully',
      result: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    })
  }
}

/**
 *  Delete a user
 * @param {*} req.params.id - id of the user
 * @param {*} res
 * @returns 
 * 
 * The id must be the exact id of the user in the database. * 
 * If the id is not valid, it will return a 404 status with a message "User not found"
 * If the id is valid, it will return a 200 status with the deleted user
 * 
 */
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
    res.status(200).json({
      success: true,
      description: 'User deleted successfully',
      result: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    })
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUsersBySector,
  getUserBySteamArea,
  getUsersByLocation,
  getUsersByEducation,
  getOneUser,
  updateUser,
  deleteUser,
}
