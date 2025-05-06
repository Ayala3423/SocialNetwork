import express from 'express';  // שינה את require ל-import
import cors from 'cors';  // שינה את require ל-import
import routes from '../Api/routes/routes.js';  // הוספתי .js לקובץ המיובא

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", routes);
app.use("/posts", routes);
app.use("/posts/:id/comments", routes);
app.use("/todos", routes);

export default app;