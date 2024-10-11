const Sector = require('../models/sector.model')

const createSector = async (req, res) => {
  try {
    const body = req.body
    const searchSector = await Sector.findOne({name: body.name})
    if (searchSector) {
      return res
        .status(409)
        .json({success: false, message: 'Sector already exists'})
    }
    const sector = new Sector(body)
    await sector.save()
    res.status(201).json({
      success: true,
      description: 'Sector created successfully',
      result: sector,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating Sector',
      error: error.message,
    })
  }
}

const getAllSectors = async (req, res) => {
  try {
    const query = req.query || {}
    const sectors = await Sector.find(query)
    res.status(200).json({
      success: true,
      description: 'Sectors retrieved successfully',
      result: sectors,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving Sectors',
      error: error.message,
    })
  }
}

const getOneSector = async (req, res) => {
  try {
    const id = req.params.id
    const sector = await Sector.findById(id)
    if (!sector) {
      res.status(404).json({
        success: false,
        message: 'Sector not found',
      })
    }
    res.status(200).json({
      success: true,
      description: 'Sector retrieved successfully',
      result: sector,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    })
  }
}

const updateSector = async (req, res) => {
  try {
    const id = req.params.id
    const sector = await Sector.findByIdAndUpdate(id, req.body, {new: true})
    if (!sector) {
      res.status(404).json({
        success: false,
        message: 'Sector not found',
      })
    }
    res.status(200).json({
      success: true,
      description: 'Sector updated successfully',
      result: sector,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    })
  }
}

const deleteSector = async (req, res) => {
  try {
    const id = req.params.id
    const sector = await Sector.findByIdAndDelete(id)
    if (!sector) {
      res.status(404).json({
        success: false,
        message: 'Sector not found',
      })
    }
    res.status(200).json({
      success: true,
      description: 'Sector deleted successfully',
      result: sector,
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
  createSector,
  getAllSectors,
  getOneSector,
  updateSector,
  deleteSector
}
