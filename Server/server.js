require("./models/index");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const sequelize = require("./config/database");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", routes);
app.use("/posts", routes);
app.use("/posts/:id/comments", routes);
app.use("/todos", routes);

try {
    await sequelize.sync().then(() => {
        app.listen(5000, () => console.log("Server is running on port 5000"));
    });
} catch (err) {
    console.error("Error connecting to server:", err);
}

try {
    await sequelize.sync({ force: false });
    console.log("Database synced successfully");
} catch (err) {
    console.error("Error syncing database:", err);
}