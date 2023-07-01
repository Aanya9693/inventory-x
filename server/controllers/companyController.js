const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const Company = require('./../models/companyModel.js');

exports.getAllCompanies = catchAsync(async (req, res, next) => {
	let query;

    if (req.query) {
        query = req.query;
	}
	
	const companies = await Company.find(query);

	res.status(200).json({
		message: 'success',
		data: {
			companies
		}
	});
});

exports.getCompany = catchAsync(async (req, res, next) => {
	const company = await Company.findById(req.params.id, req.body, {
		new: true
	});

	if (!company) return next(new AppError('No such company found with id: ', + req.params.id, 404));

	res.status(200).json({
		message: 'success',
		data: {
			company
		}
	})
});

exports.newCompany = catchAsync(async (req, res, next) => {

	const { name, owner } = req.body;
	const company = await Company.create({
		name,
		owner
	});

	res.status(200).json({
		message: 'status',
		data: {
			company
		}
	});
});

exports.updateCompany = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	
	const company = await Company.findByIdAndUpdate(id, req.body, {
		runValidators: true,
		new: true
	});

	res.status(200).json({
		message: 'success',
		data: {
			company
		}
	})
});

exports.newProduct = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const company = await Company.findById(id);

	if (!company) return next(new AppError('No such company was found with id: ' + id, 404));

	const { variants, name, numTotal, img } = req.body
	company.products.push({
		name,
		numTotal,
		variants,
		img
	});

	res.status(201).json({
		message: "success",
		data: {
			company
		}
	})
});

exports.updateProduct = catchAsync(async (req, res, next) => {
	const { id, pid } = req.params;

	const company = await Company.findById(id);
	if (!company) return next(new AppError('No such company was found with id: ' + id, 404));
	
	const product = company.products.find(item => item.id == pid);
	if (!product) return next(new AppError('No such product was found with id: ' + id, 404));

	company.products.find(item => item.id == pid) = req.body;
	
	await Company.findByIdAndUpdate(id, company);

	res.status(200).json({
		message: 'success',
		data: {
			company
		}
	});

});

