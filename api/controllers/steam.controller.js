const Steam = require('../models/steam.model')

const createSteam = async (req, res) => {
  try {
    const body = req.body
    const searchSteam = await Steam.findOne({name: body.name})
    if (searchSteam){
      return res
        .status(409)
        .json({success: false, message: 'Steam already exists'})
    }
    const steam = new Steam(body)
    await steam.save()
    res.status(201).json({
      success: true,
      description: 'Steam created successfully',
      result: steam,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating Steam',
      error: error.message,
    })
  }
}

const getAllSteams = async (req, res) => {
  try {
    const query = req.query || {}
    const steams = await Steam.find(query)
    res.status(200).json({
      success: true,
      description: 'Steams retrieved successfully',
      result: steams,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving Steams',
      error: error.message,
    })
  }
}

const getOneSteam = async (req, res) => {
  try {
    const id = req.params.id
    const steam = await Steam.findById(id)
    if (!steam) {
      res.status(404).json({
        success: false,
        message: 'Steam not found', 
      })
    }
    res.status(200).json({
      success: true,
      description: 'Steam retrieved successfully',
      result: steam
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message
    })
  }
}

const updateSteam = async (req, res) => {
  try {
    const id = req.params.id
    const steam = await Steam.findByIdAndUpdate(id, req.body, {new: true})
    if (!steam) {
      res.status(404).json({
        success: false,
        message: 'Steam not found', 
      })
    }
    res.status(200).json({
      success: true,
      description: 'Steam updated successfully',
      result: steam
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message  
    })
  }
}

const deleteSteam = async (req, res) => {
  try {
    const id = req.params.id
    const steam = await Steam.findByIdAndDelete(id)
    if (!steam) {
      res.status(404).json({
        success: false,
        message: 'Steam not found', 
      })
    }
    res.status(200).json({
      success: true,
      description: 'Steam deleted successfully',
      result: steam
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message  
    })
  }
}   

module.exports = {
  createSteam,
  getAllSteams,
  getOneSteam,
  updateSteam,
  deleteSteam
}
