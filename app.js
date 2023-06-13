import express from "express";

import checkLogin from "./app/controllers.js";
import {customErrors, firebaseErrors, jsonBodyCheck} from "./app/error_handling.js";

const app = express();

app.use(express.json());

app.post("/api/account",jsonBodyCheck, checkLogin);

app.use(firebaseErrors);

app.use(customErrors);

const { PORT = 9090 } = process.env;

app.listen(PORT);

export default app;
