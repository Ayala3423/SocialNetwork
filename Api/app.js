import express from 'express'; 
import cors from 'cors'; 
import routes from '../Api/routes/routes.js'; 

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes); 
app.use("/:table", routes);
app.use("/:table/:id/:metaTable", routes);

export default app;