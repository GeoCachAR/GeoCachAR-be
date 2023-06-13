import express from "express";

import checkLogin from "./app/controllers.js";
import handleErrors from "./app/error_handling.js";

const app = express();

app.use(express.json());

app.post("/api/account", checkLogin);

app.use(handleErrors);

const { PORT = 9090 } = process.env;

app.listen(PORT);

export default app;
