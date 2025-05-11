import express from 'express'; 
import cors from 'cors'; 
import routes from '../Api/routes/routes.js'; 

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // או '*', אבל עדיף לציין בדיוק את המקור
  credentials: true // אם אתה שולח עוגיות או headers עם הרשאות
}));
app.use("/", routes); 

export default app;