const { Storage } = require("@google-cloud/storage");
const path = require("path");
const serviceKey = path.join(__dirname, "../credentials.json");
const storage = new Storage({
	keyFilename: serviceKey,
	projectId: process.env.PROJECT_ID,
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
const uploadFile = (file, name) => {
	return new Promise((resolve, reject) => {
		if (!file) {
			reject("No image file");
		}
		const newFileName = `${name}_${Date.now()}`;
		const fileUpload = bucket.file(newFileName);
		const blobStream = fileUpload.createWriteStream({
			metadata: {
				contentType: file.mimetype,
			},
		});
		blobStream.on("error", (error) => {
			console.log(error);
			reject("Something is wrong! Unable to upload at the moment.");
		});
		blobStream.on("finish", () => {
			const url = getPublicUrl(newFileName);
			resolve(url);
		});
		blobStream.end(file.buffer);
	});
};

const getPublicUrl = (filename) => {
	return encodeURI(
		`https://storage.googleapis.com/${process.env.GCLOUD_STORAGE_BUCKET}/${filename}`
	);
};

module.exports = uploadFile;
