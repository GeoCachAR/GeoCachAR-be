import request from "supertest";
import { seedUserData, seedMapData } from "../db/seed.js";
import maps from "../db/mapTest.js";
import users from "../db/usersTest.js";
import app from "../../app.js";

beforeEach(() => {
    return users
        .map((user) => seedUserData(user))
        .concat(maps.map((map) => seedMapData(map)));
});

// afterAll(() => {
//     // process.exit();
// });

describe("POST", () => {
    describe("account", () => {
        test("Should let a user log in", () => {
            const postRequest = {
                email: "email@email.com",
                password: "test123",
            };
            return request(app)
                .post("/api/account")
                .send(postRequest)
                .expect(200)
                .then((response) => {
                    const { uid } = response.body;
                    expect(uid).toBe("KvFKEsaFXXVhkRHKUUOX6gXeyMX2");
                });
        });
        test("Should return a 404 not found if the email doesn't exist", () => {
            const postRequest = {
                email: "emali@email.com",
                password: "test123",
            };
            return request(app)
                .post("/api/account")
                .send(postRequest)
                .expect(404)
                .then((response) => {
                    const { msg } = response.body;
                    expect(msg).toBe("Email not found");
                });
        });
    });
});
