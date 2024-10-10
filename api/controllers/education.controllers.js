const Education = require('../models/education.model')

const createEducation = async (req, res) => {
    try {
        const {name} = req.body
        const searchEducation = await Education.findOne({name})
        
        if(searchEducation){
            return res.status(400).json({
                success: false,
                error: "Education already exists"
            })
        }
        
        const education = new Education(req.body)
        await education.save()
        res.status(201).json({
            success: true,
            message: "Education created successfully",
            result: education
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "ERROR: Cannot create education",
            description: error.message
        })
    }
    
}
const getAllEducation = async (req, res) => {
    try {
        const query = req.query || {}
        const educations = await Education.find(query)
        res.status(200).json({
          success: true,
          message: 'Educations fetched successfully',
          result: educations,
        })
    } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'ERROR: Cannot retrieves all educations',
          description: error.message,
        })
    }
}

const getOneEducation = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const education = await Education.findById(id)
        if(!education){
            return res.status(404).json({
                success: false,
                error: "Education not found"
            })
        }
        res.status(200).json({
          success: true,
          message: 'Education fetched successfully',
          result: education,
        })
    } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'ERROR: Cannot retrieves one education',
          description: error.message,
        })
    }
}

const updateEducation = async (req, res) => {
    try {
        const id = req.params.id
        const education = await Education.findByIdAndUpdate(id, req.body, {new: true})
        if(!education){
            return res.status(404).json({
                success: false,
                error: "Education not found"
            })
        }
        res.status(200).json({
          success: true,
          message: 'Education updated successfully',
          result: education,
        })
    } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'ERROR: Cannot updates one education',
          description: error.message
        })
    }
}

const deleteEducation = async (req, res) => {
    try {
        const id = req.params.id
        const education = await Education.findByIdAndDelete(id)
        if(!education){
            return res.status(404).json({
                success: false,
                error: "Education not found"
            })
        }
        res.status(200).json({
          success: true,
          message: 'Education deleted successfully',
          result: education,
        })
    } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'ERROR: Cannot deletes one education',
          description: error.message
        })
    }
}

module.exports = {
  createEducation,
  getAllEducation,
  getOneEducation,
  updateEducation,
  deleteEducation
}