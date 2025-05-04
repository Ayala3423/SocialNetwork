const { sequelize } = require("./models");

try {
    await sequelize.sync({ force: false });
    console.log("Database synced successfully");
} catch (err) {
    console.error("Error syncing database:", err);
}

