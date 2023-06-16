import express from "express";

import ctlrs from "./app/controllers.js";
import {customErrors, firebaseErrors, jsonBodyCheck} from "./app/error_handling.js";

const app = express();

app.use(express.json());

app.post("/api/account",jsonBodyCheck, ctlrs.checkLogin);

app.post('/api/users', ctlrs.createAccount)

app.get('/api/maps', ctlrs.getMaps)

app.get('/api/maps/:map_id', ctlrs.getMapById)

app.delete('/api/users/:user_id', ctlrs.deleteUser)

app.patch('/api/users/:user_id', ctlrs.changeUserDetails)

app.use(firebaseErrors);

app.use(customErrors);

const { PORT = 9090 } = process.env;

app.listen(PORT);

export default app;
