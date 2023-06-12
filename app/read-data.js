import { ref, onValue, off } from "firebase/database";
import db from "./db/connection.js";
import users from "./db/usersTest.js";

onValue(ref(db, "users"), (snapshot) => {
  snapshot.forEach((data) => console.log(data.val()));
});
