const User = require("../db").User;

const getAllUsers = async () => {
	try {
		const users = await User.findAll();
		return {
			status: 200,
			message: "Users retrieved!",
			data: users,
		};
	} catch (err) {
		return {
			status: 500,
			message: err,
		};
	}
};

const getUserById = async (id) => {
	try {
		const user = await User.findByPk(id);
		return {
			status: 200,
			message: "User retrieved!",
			data: user,
		};
	} catch (err) {
		return {
			status: 500,
			message: err.message,
		};
	}
};

const createUser = async (data) => {
	try {
		const user = await User.create(data);
		if (user) {
			return {
				status: 201,
				message: "User created!",
			};
		}
	} catch (err) {
		if (err.name == "SequelizeUniqueConstraintError") {
			return {
				status: 400,
				message: "Email already exist!",
			};
		}
		return {
			status: 500,
			message: err,
		};
	}
};

const updateUser = async (id, data) => {
	try {
		const user = await User.findByPk(id);
		if (user) {
			await user.update(data);
			return {
				status: 200,
				message: "User updated!",
				data: user,
			};
		} else {
			return {
				status: 404,
				message: "User not found!",
			};
		}
	} catch (err) {
		return {
			status: 500,
			message: err.message,
		};
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

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
