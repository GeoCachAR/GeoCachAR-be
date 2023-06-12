import { ref, set, update, child, push} from "firebase/database";
import db from "./connection.js"
import names from "./namesTest.js";


names.forEach((name) => {
    const newPostKey = push(child(ref(db), 'users')).key
    seedUserData(name, newPostKey)
})

function seedUserData (name, key) {
    update(ref(db), {
    ['users/' + name]:{
        name: name,
        email: "email",
    }
    })
}

export default seedUserData;