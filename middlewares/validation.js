const Joi = require("@hapi/joi");

async function registrationValidation(req, res, next) {
	// validation related to registration

	const schema = await Joi.object({
		name: Joi.string().min(3).required(),
		email: Joi.string().email().min(8).required(),
		password: Joi.string().min(4).required(),
	});

	res.validation = await schema.validate(req.body);
	next();
}

async function loginValidation(req, res, next) {
	// valdaton related to login

	const schema = await Joi.object({
		email: Joi.string().email().min(8).required(),
		password: Joi.string().min(4).required(),
	});

	res.validation = await schema.validate(req.body);
	next();
}

module.exports = { registrationValidation, loginValidation };
