import { initializeApp } from "firebase/app";

import express from 'express';

const app = express();

const {PORT = 9090} = process.env

app.listen(PORT, () => console.log('listening on port 9090'))