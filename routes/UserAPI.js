const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
	try {
		const users = await User.find({});
		res.json({ users });
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
