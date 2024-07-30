const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUrl = "https://peer-to-peer-59rz.onrender.com/auth/google/callback";
require("dotenv").config(); // Load environment variables
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const userModel = require("../models/userModel");

const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

const getProtected = async (req, res) => {
	res.json({ message: "This is a protected route", user: req.user });
};

const login = async (req, res) => {
	// console.log('login');
	const authorizationUrl = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
		],
	});

	res.redirect(authorizationUrl);
};

const callback = async (req, res) => {
	const code = req.query.code;
	console.log(code);
	try {
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);
		// console.log(tokens)
		// tokens.access_token

		const oauth2 = google.oauth2({
			auth: oauth2Client,
			version: "v2",
		});

		const googleUser = await oauth2.userinfo.get();
		// console.log(googleUser.data);
		// check against the DB
		console.log(googleUser.data.name, googleUser.data.email);

    //create a user only if the user is not already added
const user  = await userModel.getUserByEmail(googleUser.data.email);
console.log("User from the DB is:", user);

//res json data <- refer controller files

if (!user) {
  await userModel.createUser(googleUser.data.name, googleUser.data.email)
  
}
// res.json(user)

		res.redirect(`http://localhost:5173/callback?token=${tokens.id_token}`);
		//post to the database

		// //check if the are already in the database
		// //if not already in the database store their info
		// // if info has changed update the database

		//     res.redirect(`http://localhost:5173/callback?token=${tokens.id_token}`);
	} catch (error) {
		console.error(error);
		res.status(500).send("Authentication failed!");
	}
};

module.exports = {
	getProtected,
	login,
	callback,
};
