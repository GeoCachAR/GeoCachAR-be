import { ref, onValue, off } from "firebase/database";
import db from "./db/connection.js";
import names from "./db/namesTest.js";

onValue(ref(db, "users"), (snapshot) => {
    snapshot.forEach((data) => console.log(data.val()));
});
