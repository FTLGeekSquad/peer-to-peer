const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PORT = 3000;
app.use(morgan("dev"));
app.use(
	cors({
		origin: "http://localhost:5173",
	})
);
app.use(express.json());
const listingRoutes = require("./routes/listingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/listings", listingRoutes);
app.use("/reviews", reviewRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
	res.send("Welcome to my app!");
});
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
