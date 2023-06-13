const { User, Otp } = require("../db");

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
		if (user) {
			return {
				status: 200,
				message: "User retrieved!",
				data: user,
			};
		}
		return {
			status: 404,
			message: "User not found!",
		};
	} catch (err) {
		return {
			status: 500,
			message: err.message,
		};
	}
};

const getUserByEmail = async (email) => {
	try {
		const user = await User.findOne({ where: { email: email } });
		if (user) {
			return {
				status: true,
				statusCode: 200,
				message: "User retrieved!",
				data: user,
			};
		}
		return { status: false, statusCode: 404, message: "User not found!" };
	} catch (err) {
		return { status: false, statusCode: 500, message: err.message };
	}
};

const createUser = async (data) => {
	try {
		const user = await User.create(data);
		if (user) {
			return {
				status: true,
				statusCode: 201,
				message: "User created!",
				data: {
					id: user.id,
					nama: user.nama,
					email: user.email,
					no_telp: user.no_telp,
					is_verified: user.is_verified,
				},
			};
		}
	} catch (err) {
		if (err.name == "SequelizeUniqueConstraintError") {
			return {
				status: false,
				statusCode: 400,
				message: "Email already exist!",
			};
		}
		return {
			status: false,
			statusCode: 500,
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
				status: true,
				statusCode: 200,
				message: "User updated!",
				data: user,
			};
		} else {
			return {
				status: false,

				statusCode: 404,
				message: "User not found!",
			};
		}
	} catch (err) {
		return {
			status: false,

			statusCode: 500,
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

const createOtp = async (data) => {
	try {
		const otp = await Otp.create(data);
		if (otp) {
			return {
				status: true,
				statusCode: 201,
				message: "OTP created!",
			};
		}
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err,
		};
	}
};

const getOtpByUserId = async (id) => {
	try {
		const otp = await Otp.findOne({
			where: { user_id: id },
			order: [["created_at", "DESC"]],
		});
		if (otp) {
			return {
				status: true,
				statusCode: 200,
				message: "OTP retrieved!",
				data: otp,
			};
		}
		return { status: false, statusCode: 404, message: "OTP not found!" };
	} catch (err) {
		return { status: false, statusCode: 500, message: err };
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	getUserByEmail,
	createUser,
	updateUser,
	deleteUser,
	createOtp,
	getOtpByUserId,
};
