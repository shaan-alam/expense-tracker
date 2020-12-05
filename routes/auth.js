const express = require("express");
const router = express.Router();
const {
	registrationValidation,
	loginValidation,
} = require("../middlewares/validation");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// registration route
router.post("/register/", registrationValidation, async (req, res) => {
	const { errors } = res.validation;

	// if there are errors
	if (errors) {
		return res.status(400).json({ message: errors.details[0].message });
	}

	// check if user already exists in the database
	const user = await User.findOne({ email: req.body.email });
	if (user) {
		return res.status(400).json({ message: "That email is already taken" });
	}

	// if everything is OK, then start the registration process
	// generate a salt and hash the password using bcryptjs
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// create a new user and save it
	const newUser = await new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	});
	await newUser.save();

	// sign a token and respond with the newly saved user and token

	const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
	res.json({ token, user: { email: newUser.email, name: newUser.name } });
});

// login route
router.post("/login", loginValidation, async (req, res) => {
	const { error } = res.validation;

	// handle any validation error
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	// check if user exists in the database
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(400).json({ message: "That email doesn't exists!!" });
	}

	// if everything is OK then start the login process

	// compare password
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!isPasswordValid) {
		return res.status(400).json({ message: "Invalid Password" });
	}

	// sign a token and respond with that token and user
	const token = await jwt.sign({ _id: user._id }, process.env.SECRET);
	res.json({ token, user: { name: user.name, email: user.email } });
});

module.exports = router;
