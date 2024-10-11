const router = require('express').Router()
const {
    createCompany,
    getAllCompanies,
    getOneCompany,
    updateCompany,
    deleteCompany
} = require('../controllers/company.controllers')

router
    .post('/', createCompany)
    .get('/', getAllCompanies)
    .get('/:id', getOneCompany)
    .patch('/:id', updateCompany)
    .delete('/:id', deleteCompany)
module.exports = router