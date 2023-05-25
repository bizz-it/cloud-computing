const User = require("../db").User;

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).send(users);
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

const getUserById = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		res.status(200).send(user);
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

const createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).send(user);
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (user) {
			await user.update(req.body);
			res.status(200).send(user);
		} else {
			res.status(404).send({ message: "User not found!" });
		}
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (user) {
			await user.destroy();
			res.status(200).send({ message: "User deleted!" });
		} else {
			res.status(404).send({ message: "User not found!" });
		}
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};
