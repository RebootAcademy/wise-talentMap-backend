const Company = require('../models/company.model')
const Location = require('../models/location.model')

const createCompany = async (req, res) => {
  try {
    let body = req.body
    
    const searchCompany = await Company.findOne({name: body.name})
    if (searchCompany) {
      return res.status(409).json({
        success: false,
        message: 'Company already exists',
      })
    }
    const location = await Location.findOne({name: body.location})
    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      })
    }

    body = {
      ...body,
      location: location._id
    }

    const company = new Company(body)
    await company.save()
    res.status(201).json({
      success: true,
      description: 'Company created successfully',
      result: company,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating Company',
      error: error.message,
    })
  }
}

const getAllCompanies = async (req, res) => {
  try {
    const query = req.query || {}
    const companies = await Company.find(query)
    res.status(200).json({
      success: true,
      description: 'Companies retrieved successfully',
      result: companies,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving Companies',
      error: error.message,
    })
  }
}

const getOneCompany = async (req, res) => {
  try {
    const id = req.params.id
    const company = await Company.findById(id)
    if (!company) {
      res.status(404).json({
        success: false,
        message: 'Company not found',
      })
    }
    res.status(200).json({
      success: true,
      description: 'Company retrieved successfully',
      result: company,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    })
  }
}

const updateCompany = async (req, res) => {
  try {
    const id = req.params.id
    const company = await Company.findByIdAndUpdate(id, req.body, {new: true})
    if (!company) {
      res.status(404).json({
        success: false,
        message: 'Company not found',
      })
    }
    res.status(200).json({
      success: true,
      description: 'Company updated successfully',
      result: company,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    })
  }
}

const deleteCompany = async (req, res) => {
  try {
    const id = req.params.id
    const company = await Company.findByIdAndDelete(id)
    if (!company) {
      res.status(404).json({
        success: false,
        message: 'Company not found',
      })
    }
    res.status(200).json({
      success: true,
      description: 'Company deleted successfully',
      result: company,
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
  createCompany,
  getAllCompanies,
  getOneCompany,
  updateCompany,
  deleteCompany,
}
