const express = require("express");
const userRouter = express.Router();
const User = require("../models/users.model");
const Franchise = require("../models/franchise.model");
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
			if (response.statusCode === 201) {
				const token = jwt.generateToken(response.data);
				return res.status(201).send({ ...response, token });
			}
			return res.status(response.statusCode).send(response);
		})
		.catch((err) => {
			return res.status(500).send(err);
		});
});

userRouter.post("/login", async (req, res) => {
	const schema = joi.object({
		email: joi.string().email().required(),
		password: joi.string().min(6).required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return res
			.status(400)
			.send({ status: false, message: error.details[0].message });
	}

	const data = {
		email: req.body.email,
		password: req.body.password,
	};

	try {
		const user = await User.getUserByEmail(data.email);
		if (user.statusCode === 200) {
			const validPassword = await bcrypt.compare(
				data.password,
				user.data.password
			);
			if (!validPassword) {
				return res
					.status(400)
					.send({ status: false, message: "Invalid email or password" });
			}
			const token = jwt.generateToken(user.data);
			return res.status(200).send({
				status: true,
				statusCode: 200,
				message: "Login success!",
				data: {
					id: user.data.id,
					nama: user.data.nama,
					email: user.data.email,
					no_telp: user.data.no_telp,
					foto: user.data.foto,
					tempat_lahir: user.data.tempat_lahir,
					tanggal_lahir: user.data.tanggal_lahir,
					is_verified: user.data.is_verified,
				},
				token: token,
			});
		}
		return res
			.status(404)
			.send({ status: false, message: "Invalid email or password" });
	} catch (error) {
		return res.status(500).send({ status: false, message: error.message });
	}
});

userRouter.get("/:id/franchises", jwt.verifyToken, async (req, res) => {
	const response = await Franchise.getFranchisesByUserId(req.params.id);
	return res.status(response.statusCode).send(response);
});

module.exports = userRouter;
