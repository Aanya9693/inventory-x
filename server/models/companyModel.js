const mongoose = require('mongoose');

const companyModel = new mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, 'Company name is required']
		},
		products: [{
			name: String,
			numTotal: Number,
			variants: [{
				name: String,
				num: Number
			}],
			img: String
		}],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		employes: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'User'
		},
		pin: {
			type: String,
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

companyModel.pre('save', function (next) {
	if (!this.pin) {
		this.pin = Math.random() * 100000;
	}
	next();
});

const Company = mongoose.model('Company', companyModel);

module.exports = Company;