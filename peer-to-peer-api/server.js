const express = require("express");
const app = express();
const cors = require("cors");
const listingRoutes = require("./routes/listingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.use("/listings", listingRoutes);
app.use("/reviews", reviewRoutes);
app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
	res.send("Welcome to my app!");
});
