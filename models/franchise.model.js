const Franchise = require("../db").Franchise;
const FranchiseCategory = require("../db").FranchiseCategory;
const FranchisePackage = require("../db").FranchisePackage;

const getAllFranchises = async () => {
	try {
		const franchises = await Franchise.findAll({
			include: [
				{
					model: FranchiseCategory,
					as: "franchise_category",
				},
				{
					model: FranchisePackage,
					as: "franchise_packages",
				},
			],
		});
		return {
			status: true,
			statusCode: 200,
			message: "Franchises retrieved!",
			data: franchises,
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const getFranchiseById = async (id) => {
	try {
		const franchise = await Franchise.findByPk(id, {
			include: [
				{
					model: FranchiseCategory,
					as: "franchise_category",
				},
				{
					model: FranchisePackage,
					as: "franchise_packages",
				},
			],
		});
		if (franchise) {
			return {
				status: true,
				statusCode: 200,
				message: "Franchise retrieved!",
				data: franchise,
			};
		}
		return {
			status: false,
			statusCode: 404,
			message: "Franchise not found!",
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const createFranchise = async (data) => {
	try {
		const franchise = await Franchise.create(data);

		return {
			status: 201,
			message: "Franchise created!",
			data: franchise,
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const getFranchisesByUserId = async (id) => {
	try {
		const franchises = await Franchise.findAll({
			where: { user_id: id },
			include: [
				{
					model: FranchiseCategory,
					as: "franchise_category",
				},
				{
					model: FranchisePackage,
					as: "franchise_packages",
				},
			],
		});
		if (franchises) {
			return {
				status: true,
				statusCode: 200,
				message: "Franchises retrieved!",
				data: franchises,
			};
		}
		return {
			status: false,
			statusCode: 404,
			message: "Franchises not found!",
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const createFranchiseCategory = async (data) => {
	try {
		const franchiseCategory = await FranchiseCategory.create(data);
		return {
			status: 201,
			message: "Franchise Category created!",
			data: franchiseCategory,
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const createFranchisePackage = async (data) => {
	try {
		const franchisePackage = await FranchisePackage.create(data);
		return {
			status: true,
			statusCode: 201,
			message: "Franchise Package created!",
			data: franchisePackage,
		};
	} catch (err) {
		console.log(err);
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const updateFranchise = async (id, data) => {
	try {
		const franchise = await Franchise.findByPk(id);
		if (franchise) {
			const updatedFranchise = await franchise.update(data);
			return {
				status: 200,
				message: "Franchise updated!",
				data: updatedFranchise,
			};
		}
		return {
			status: false,
			statusCode: 404,
			message: "Franchise not found!",
		};
	} catch (err) {
		return {
			status: 500,
			message: err.message,
		};
	}
};

const updateFranchiseCategory = async (id, data) => {
	try {
		const franchiseCategory = await FranchiseCategory.findByPk(id);
		if (franchiseCategory) {
			const updatedFranchiseCategory = await franchiseCategory.update(data);
			return {
				status: 200,
				message: "Franchise Category updated!",
				data: updatedFranchiseCategory,
			};
		}
		return {
			status: false,
			statusCode: 404,
			message: "Franchise Category not found!",
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const updateFranchisePackage = async (id, data) => {
	try {
		const franchisePackage = await FranchisePackage.findByPk(id);
		if (franchisePackage) {
			const updatedFranchisePackage = await franchisePackage.update(data);
			return {
				status: true,
				statusCode: 200,
				message: "Franchise Package updated!",
				data: updatedFranchisePackage,
			};
		}
		return {
			status: false,
			statusCode: 404,
			message: "Franchise Package not found!",
		};
	} catch (err) {
		return {
			status: false,
			statusCode: 500,
			message: err.message,
		};
	}
};

const deleteFranchise = async (id) => {
	try {
		const franchise = await Franchise.findByPk(id);
		if (franchise) {
			await franchise.destroy();
			return {
				status: 200,
				message: "Franchise deleted!",
			};
		}
		return {
			status: 404,
			message: "Franchise not found!",
		};
	} catch (err) {
		return {
			status: 500,
			message: err.message,
		};
	}
};

const deleteFranchiseCategory = async (id) => {
	try {
		const franchiseCategory = await FranchiseCategory.findByPk(id);
		if (franchiseCategory) {
			await franchiseCategory.destroy();
			return {
				status: 200,
				message: "Franchise Category deleted!",
			};
		}
		return {
			status: 404,
			message: "Franchise Category not found!",
		};
	} catch (err) {
		return {
			status: 500,
			message: err.message,
		};
	}
};

const deleteFranchisePackage = async (id) => {
	try {
		const franchisePackage = await FranchisePackage.findByPk(id);
		if (franchisePackage) {
			await franchisePackage.destroy();
			return {
				status: 200,
				message: "Franchise Package deleted!",
			};
		}
		return {
			status: 404,
			message: "Franchise Package not found!",
		};
	} catch (err) {
		return {
			status: 500,
			message: err.message,
		};
	}
};

const deleteFranchisePackageByFranchiseId = async (id) => {
	try {
		const franchisePackage = await FranchisePackage.destroy({
			where: {
				franchise_id: id,
			},
		});
		if (franchisePackage) {
			return {
				status: true,
				statusCode: 200,
				message: "Franchise Package deleted!",
			};
		}
		return {
			status: false,
			statusCode: 404,
			message: "Franchise Package not found!",
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
	getAllFranchises,
	getFranchiseById,
	getFranchisesByUserId,
	createFranchise,
	createFranchiseCategory,
	createFranchisePackage,
	updateFranchise,
	updateFranchiseCategory,
	updateFranchisePackage,
	deleteFranchise,
	deleteFranchiseCategory,
	deleteFranchisePackage,
	deleteFranchisePackageByFranchiseId,
};
