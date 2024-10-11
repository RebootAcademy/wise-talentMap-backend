const Location = require('../models/location.model')

const createLocation = async (req, res) => {
  try {
    const {name} = req.body
    const searchLocation = await Location.findOne({name})
    if (searchLocation)
      return res
        .status(409)
        .json({success: false, message: 'Location already exists'})
    const location = new Location(req.body)
    await location.save()
    res.status(200).json({
      success: true,
      description: 'Location created successfully',
      result: location,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    })
  }
}

const getAllLocations = async (req, res) => {
    try {
        const query = req.query || {}
        const locations = await Location.find(query)
        res.status(200).json({
            success: true,
            description: 'Locations retrieved successfully',
            result: locations
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.message
        })
    }
}

const getOneLocation = async (req, res) => {
    try {
        const id = req.params.id
        const location = await Location.findById(id)
        if (!location) {
            res.status(404).json({
                success: false,
                message: 'Location not found', 
            })
        }
        res.status(200).json({
            success: true,
            description: 'Location retrieved successfully',
            result: location
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.message
        })
    }
}

const updateLocation = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const updatedLocation = await Location.findByIdAndUpdate(id, body, {new: true})
        res.status(200).json({
            success: true,
            description: 'Location updated successfully',
            result: updatedLocation
        })
    } catch (error) {
        
    }
}

const deleteLocation = async (req, res) => {
  try {
    const id = req.params.id
    const location = await Location.findByIdAndDelete(id)
    if (!location) {
      res.status(404).json({
        success: false,
        message: 'Location not found', 
      })
    }
    res.status(200).json({
      success: true,
      description: 'Location deleted successfully',
      result: location,
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
  createLocation,
  getAllLocations,
  getOneLocation,
  updateLocation,
  deleteLocation
}
