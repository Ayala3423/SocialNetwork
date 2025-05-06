import app from '../Api/app.js'; 
import sequelize from '../DB/Config/db.js'; 

const start = async () => {
    try {
        await sequelize.sync();
        app.listen(5000, () => console.log('Server is running on port 5000'));
    } catch (err) {
        console.error('Error starting the server:', err);
    }
};

start();