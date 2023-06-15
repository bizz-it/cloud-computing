const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { sequelize } = require("./db");
const port = process.env.PORT || 3000;
const userRoutes = require("./controllers/user.controller");
const franchiseRoutes = require("./controllers/franchise.controller");
const agreementRoutes = require("./controllers/agreement.controller");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const isProduction = process.env.NODE_ENV === "production";

sequelize
	.sync({ alter: !isProduction })
	.then(() => {
		console.log(
			isProduction
				? "Database synced without altering."
				: "Drop and re-sync db."
		);
	})
	.catch((err) => {
		console.log(err);
	});

app.use("/users", userRoutes);
app.use("/franchises", franchiseRoutes);
app.use("/agreements", agreementRoutes);

app.get("*", (_req, res) => {
	res.status(404).send("Not found");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
