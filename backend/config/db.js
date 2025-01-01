const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// Update with your PostgreSQL credentials
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,

  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    logging: false, // Set to true for SQL query logging
    dialectOptions: {
      ssl: {
        require: process.env.DATABASE_SSL,
      },
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
