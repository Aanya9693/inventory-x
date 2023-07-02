const express = require('express');
const companyController = require('../controllers/companyController');
const authController = require('../controllers/authController');

const Router = express.Router();

// All your routes will go here

Router.route('/')
    .get(authController.protect, companyController.getAllCompanies)
    .post(authController.protect, companyController.newCompany);

Router.route('/:id')
    .get(authController.protect, companyController.getCompany)
    .patch(authController.protect, companyController.updateCompany)
    .post(authController.protect, companyController.newProduct);

Router.route('/:id/:pid').get(
    authController.protect,
    companyController.updateProduct
);

module.exports = Router;
