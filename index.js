const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { sequelize } = require("./db");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize
	.sync({ alter: true })
	.then(() => {
		console.log("Drop and re-sync db.");
	})
	.catch((err) => {
		console.log(err);
	});

app.get("/", (_req, res) => {
	res.send("Hello World!");
});
app.get("*", (_req, res) => {
	res.status(404).send("Not found");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
