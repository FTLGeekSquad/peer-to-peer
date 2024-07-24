const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { OAuth2Client } = require("google-auth-library");
const verifyToken = require("./middleware/auth");
const { google } = require('googleapis'); 

const PORT = 3000;
app.use(morgan('dev'));

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

const listingRoutes = require("./routes/listingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/listings", listingRoutes);
app.use("/reviews", reviewRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to my app!");
});

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUrl = "http://localhost:3000/auth/google/callback";
require("dotenv").config(); // Load environment variables

const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

app.get("/protected_route", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.get("/auth/login", (req, res) => {
  console.log('login');
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  res.redirect(authorizationUrl);
});

app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  console.log(code);
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log(tokens);

    const oauth2 = google.oauth2('v2').userinfo;

    const googleUser = await oauth2.userinfo.get();

    console.log(googleUser.data);
//check if the are already in the database
//if not already in the database store their info
// if info has changed update the database




    res.redirect(`http://localhost:5173/callback?token=${tokens.id_token}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Authentication failed!");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
