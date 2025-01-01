const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const seatsRoutes = require("./routes/seats.routes");
const sequelize = require("./config/db");

// Initialize environment variables
dotenv.config({ path: "./.env" });

// Initialize Express application
const app = express();

// Connect to the database

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Unstop Assignment API is running");
});

// Seats Routes
app.use("/api/seats", seatsRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
(async () => {
  try {
    await sequelize.sync(); // Ensures database tables are created
    console.log("Database synchronized.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
})();

module.exports = app;
