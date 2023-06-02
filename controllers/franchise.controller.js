const express = require("express");
const franchiseRouter = express.Router();
const Franchise = require("../models/franchise.model");
const jwt = require("../middleware/jwt");
const joi = require("joi");

franchiseRouter.get("/", async (_req, res) => {
	const response = await Franchise.getAllFranchises();
	res.status(response.status).send(response);
});

franchiseRouter.get("/:id", async (req, res) => {
	const response = await Franchise.getFranchiseById(req.params.id);
	res.status(response.status).send(response);
});

franchiseRouter.post("/", jwt.verifyToken, async (req, res) => {
	const schema = joi.object({
		nama: joi.string().required(),
		user_id: joi.number().required(),
		logo: joi.string().required(),
		foto: joi.string().required(),
		deskripsi: joi.string().required(),
		requirement: joi.string().required(),
		dokumen: joi.string().required(),
		total_gerai: joi.number(),
		franchise_category_id: joi.number().required(),
		franchise_packages: joi.array().items(joi.number()).required(),
	});
	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const response = await Franchise.createFranchise(req.body);
	if (response.status !== 201) {
		return res.status(response.status).send(response);
	}

	const franchisePackage = await Franchise.getFranchiseById(response.data.id);
	const franchisePackageData = req.body.franchise_packages.map((packageId) => {
		return {
			franchise_id: franchisePackage.data.id,
			franchise_package_id: packageId,
		};
	});
	const res = await Franchise.createFranchisePackage(franchisePackageData);
	res.status(res.status).send(response);
});



module.exports = franchiseRouter;
