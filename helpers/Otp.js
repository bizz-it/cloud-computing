const User = require("../db").User;
const { sendEmail } = require("./emailService");

//generate otp with 4 digits
const generateOtp = () => {
	return Math.floor(1000 + Math.random() * 9000);
};

const sendOtp = async (email) => {
	const otp = generateOtp();
	const subject = "Welcome to Bizz-it";
	const message = `
    To verify your account please enter the following OTP:\n
    <h1>OTP: ${otp}</h1>
    <p>Please note that this OTP is valid for 5 minutes.</p>
    `;
	const response = await sendEmail(email, subject, message);
	if (response.statusCode === 200) {
		console.log("here");
		return {
			...response,
			otp: otp,
		};
	}
	return response;
};

module.exports = { generateOtp, sendOtp };
