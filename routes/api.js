const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction.js");
const auth = require("../middlewares/auth");

/**
 * @TYPE - GET
 * @DESC - Get all the transactions
 */

router.get("/", auth, async (req, res) => {
	try {
		const transactions = await Transaction.find().sort({ date: -1 });
		res.json(transactions);
	} catch (err) {
		res.json(err);
	}
});

/**
 * @TYPE - POST
 * @DESC - Create a new transaction
 */

router.post("/", auth, async (req, res) => {
	const { title, amount } = req.body;

	try {
		const newTransaction = await new Transaction({ title, amount });
		// save the new transaction
		await newTransaction.save();

		res.json(newTransaction);
	} catch (err) {
		res.status(400).json(err);
	}
});

/**
 * @TYPE - DELETE
 * @DESC - Deleta a transaction
 */

router.delete("/:_id", auth, async (req, res) => {
	try {
		const transaction = await Transaction.findOne({ _id: req.params._id });
		await Transaction.deleteOne({ _id: req.params._id });

		res.json({ transaction });
	} catch (err) {
		res.json(err);
	}
});

/**
 * @TYPE - PUT
 * @DESC - Edit a transaction
 */

router.put("/:_id", auth, async (req, res) => {
	const { transaction } = req.body;

	try {
		await Transaction.updateOne({ _id: req.params._id }, transaction);
		const updatedTransaction = await Transaction.findOne({
			_id: req.params._id,
		});

		res.json(updatedTransaction);
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
