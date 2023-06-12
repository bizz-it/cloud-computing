const Agreement = require("../db").Agreement;

const getAllAgreements = async () => {
	try {
		const agreements = await Agreement.findAll();
		return {
			status: true,
			statusCode: 200,
			message: "Agreements retrieved!",
			data: agreements,
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const getAgreementById = async (id) => {
	try {
		const agreement = await Agreement.findByPk(id);
		if (agreement) {
			return {
				status: true,
				statusCode: 200,
				message: "Agreement retrieved!",
				data: agreement,
			};
		}
		return {
			status: false,
			statusCode: 404,
			message: "Agreement not found!",
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const createAgreement = async (data) => {
	try {
		const agreement = await Agreement.create(data);

		return {
			status: true,
			statusCode: 200,
			message: "Agreement created!",
			data: agreement,
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const updateAgreement = async (id, data) => {
	try {
		const agreement = await Agreement.findByPk(id);
		if (agreement) {
			const updatedAgreement = await agreement.update(data);
			return {
				status: true,
				statusCode: 200,
				message: "Agreement updated!",
				data: updatedAgreement,
			};
		}
		return {
			status: false,
			statusCode: 404,
			message: "Agreement not found!",
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const deleteAgreement = async (id) => {
	try {
		const agreement = await Agreement.findByPk(id);
		if (agreement) {
			await agreement.destroy();
			return {
				status: true,
				statusCode: 200,
				message: "Agreement deleted!",
			};
		}
		return {
			status: false,
			statusCode: 404,
			message: "Agreement not found!",
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

module.exports = {
	getAllAgreements,
	getAgreementById,
	createAgreement,
	updateAgreement,
	deleteAgreement,
};
