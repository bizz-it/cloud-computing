const express = require("express");
const userRouter = express.Router();
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("../middleware/jwt");
const joi = require("joi");

userRouter.post("/register", async (req, res) => {
	const schema = joi.object({
		nama: joi.string().min(3).required(),
		email: joi.string().email().required(),
		password: joi.string().min(6).required(),
		no_telp: joi.string().min(10).max(15).required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		console.log(error.details);
		return res
			.status(400)
			.send({ status: false, message: error.details[0].message });
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const data = {
		nama: req.body.nama,
		email: req.body.email,
		password: hashedPassword,
		no_telp: req.body.no_telp,
	};

	await User.createUser(data)
		.then((response) => {
			res.status(response.status).send(response);
		})
		.catch((err) => {
			res.send(err);
		});
});

module.exports = userRouter;
