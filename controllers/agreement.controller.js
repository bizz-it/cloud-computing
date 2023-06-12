const express = require("express");
const agreementRouter = express.Router();
const Agreement = require("../models/agreement.model");
const jwt = require("../middleware/jwt");
const joi = require("joi");

agreementRouter.get("/", async (_req, res) => {
  const response = await Agreement.getAllAgreements();
  res.status(response.status).send(response);
});

agreementRouter.get("/:id", async (req, res) => {
  const response = await Agreement.getAgreementById(req.params.id);
  res.status(response.status).send(response);
});

agreementRouter.post("/", jwt.verifyToken, async (req, res) => {
  const schema = joi.object({
    // Define your validation schema for the agreement data here
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const response = await Agreement.createAgreement(req.body);
  res.status(response.status).send(response);
});

agreementRouter.put("/:id", jwt.verifyToken, async (req, res) => {
  const schema = joi.object({
    // Define your validation schema for the updated agreement data here
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const response = await Agreement.updateAgreement(req.params.id, req.body);
  res.status(response.status).send(response);
});

agreementRouter.delete("/:id", jwt.verifyToken, async (req, res) => {
  const response = await Agreement.deleteAgreement(req.params.id);
  res.status(response.status).send(response);
});

module.exports = agreementRouter;
