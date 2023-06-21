import express from "express";
import logger from "morgan";
import paginate from "express-paginate";

import routes from "./routes/index.js";
const app = express();
// Include pagination middleware
app.use(paginate.middleware(50, 1000));
// Include routes
app.use("/", routes);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
