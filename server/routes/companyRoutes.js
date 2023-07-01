const express = require('express');
const companyController = require('../controllers/companyController')

const Router = express.Router();

// All your routes will go here

Router.route('/').get(companyController.getAllCompanies).post(companyController.newCompany);

Router.route('/:id').get(companyController.getCompany).patch(companyController.updateCompany).post(companyController.newProduct);

Router.route('/:id/:pid').get(companyController.updateProduct);

module.exports = Router;
