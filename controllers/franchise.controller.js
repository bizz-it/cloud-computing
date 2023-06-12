const express = require("express");
const franchiseRouter = express.Router();
const Franchise = require("../models/franchise.model");
const uploadFile = require("../helpers/fileUpload");
const multer = require("multer");
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});
const jwt = require("../middleware/jwt");
const joi = require("joi");

franchiseRouter.get("/", jwt.verifyToken, async (_req, res) => {
	const response = await Franchise.getAllFranchises();
	return res.status(response.statusCode).send(response);
});

franchiseRouter.get("/:id", jwt.verifyToken, async (req, res) => {
	const response = await Franchise.getFranchiseById(req.params.id);
	return res.status(response.statusCode).send(response);
});

franchiseRouter.post(
	"/",
	jwt.verifyToken,
	upload.fields([
		{ name: "logo", maxCount: 1 },
		{ name: "foto", maxCount: 1 },
		{ name: "dokumen", maxCount: 1 },
	]),
	async (req, res) => {
		const schema = joi.object({
			nama: joi.string().required(),
			deskripsi: joi.string().required(),
			requirement: joi.string().required(),
			total_gerai: joi.number(),
			franchise_category_id: joi.number().required(),
			franchise_packages: joi.array().items(
				joi.object({
					package: joi.string().required(),
					price: joi.number().required(),
				})
			),
		});
		const { error } = schema.validate(req.body);
		if (error) {
			return res.status(400).send({
				status: false,
				statusCode: 400,
				message: error.details[0].message,
			});
		}
		const { nama, franchise_packages } = req.body;
		delete req.body.franchise_packages;

		//handle file upload for non required file
		if (req.files) {
			try {
				req.body.logo = await uploadFile(req.files.logo?.[0], "logo-" + nama);
				req.body.foto = await uploadFile(req.files.foto?.[0], "foto-" + nama);
				req.body.dokumen = await uploadFile(
					req.files.dokumen?.[0],
					"dokumen-" + nama
				);
			} catch (error) {
				console.log(error);
				return res.status(500).send({
					status: false,
					statusCode: 500,
					message: error,
				});
			}
		}

		const response = await Franchise.createFranchise({
			...req.body,
			user_id: req.userId,
		});
		if (response.status !== 201) {
			return res.status(response.statusCode).send(response);
		}
		if (!franchise_packages) {
			return res.status(201).send(response);
		}

		const franchiseId = response.data.id;

		const responsePackage = await Promise.all(
			franchise_packages.map((data) => {
				// create franchise package
				return Franchise.createFranchisePackage({
					...data,
					franchise_id: franchiseId,
				});
			})
		);

		return res.status(responsePackage[0].statusCode).send({
			status: responsePackage[0].status,
			statusCode: responsePackage[0].statusCode,
			message: response.message,
		});
	}
);

franchiseRouter.delete("/:id", jwt.verifyToken, async (req, res) => {
	const response = await Franchise.deleteFranchisePackageByFranchiseId(
		req.params.id
	);
	if (response.statusCode !== 200) {
		return res.status(response.statusCode).send(response);
	}
	const responseFranchise = await Franchise.deleteFranchiseById(req.params.id);

	return res.status(responseFranchise.statusCode).send(responseFranchise);
});

module.exports = franchiseRouter;
