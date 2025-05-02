const { sequelize } = require("./models");

sequelize.sync({ force: false })
    .then(() => {
        console.log("Database synced successfully");
    })
    .catch(err => {
        console.error("Error syncing database:", err);
    });