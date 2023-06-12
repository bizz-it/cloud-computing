const express = require("express");
const agreementRouter = express.Router();
const Agreement = require("../models/agreement.model");
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

agreementRouter.get("/", async (_req, res) => {
	const response = await Agreement.getAllAgreements();
	res.status(response.statusCode).send(response);
});

agreementRouter.get("/:id", async (req, res) => {
	const response = await Agreement.getAgreementById(req.params.id);
	res.status(response.statusCode).send(response);
});

agreementRouter.post(
	"/",
	jwt.verifyToken,
	upload.fields([
		{ name: "location_photo", maxCount: 1 },
		{ name: "agreement_document", maxCount: 1 },
	]),
	async (req, res) => {
		const schema = joi.object({
			franchise_id: joi.string().required(),
			franchise_package_id: joi.string().required(),
			users_location: joi.string().required(),
		});

		const { error } = schema.validate(req.body);
		if (error) {
			return res.status(400).send(error.details[0].message);
		}
		//handle file upload for non required file
		if (req.files["location_photo"]) {
			const location_photo = await uploadFile(
				req.files["location_photo"][0],
				"location_photo"
			);
			req.body.users_photo_location = location_photo;
		}
		if (req.files["agreement_document"]) {
			const agreement_document = await uploadFile(
				req.files["agreement_document"][0],
				"agreement_document"
			);
			req.body.agreement_document = agreement_document;
		}

		const response = await Agreement.createAgreement({
			...req.body,
			user_id: req.userId,
		});
		res.status(response.statusCode).send(response);
	}
);

agreementRouter.put("/:id", jwt.verifyToken, async (req, res) => {
	const schema = joi.object({});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const response = await Agreement.updateAgreement(req.params.id, req.body);
	res.status(response.statusCode).send(response);
});

agreementRouter.delete("/:id", jwt.verifyToken, async (req, res) => {
	const response = await Agreement.deleteAgreement(req.params.id);
	res.status(response.statusCode).send(response);
});

module.exports = agreementRouter;
