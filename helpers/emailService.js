const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const sendEmail = async (email, subject, message) => {
	try {
		await transporter.sendMail({
			from: process.env.EMAIL_USERNAME,
			to: email,
			subject: subject,
			html: message,
		});
		return { status: true, statusCode: 200, message: "Email sent!" };
	} catch (err) {
		console.log(err);
		return { status: false, statusCode: 500, message: err.message };
	}
};

module.exports = { sendEmail };
