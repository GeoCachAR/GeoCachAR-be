import request from "supertest";
import { seedUserData, seedMapData } from "../db/seed.js";
import maps from "../db/mapTest.js";
import users from "../db/usersTest.js";
import app from "../../app.js";

const uids = {
    "s@s": "uid-here",
    notstevie: "uid-here",
    kieran: "uid-here",
    "s3@email": "uid-here",
};

const beforeButOurFunc = () => {
    const auth = getAuth(firebaseApp);
    const allUsers = [
        { email: "kierantesting@email.com", password: "Coding1" },
        { email: "email@email.com", password: "test123" },
        { email: "usercredential@email.com", password: "Coding1" },
        { email: "test@test.com", password: "Coding1" },
        { email: "itstillgfworksas@test.com", password: "Coding" },
        { email: "s@s.com", password: "123456" },
        {
            email: "example.test@email.com",
            password: "The password",
            name: "notstevie",
        },
        { email: "stevie3@email.com", password: "123456" },
    ];
    const startWith = [
        { email: "kierantesting@email.com", password: "Coding1" },
        { email: "email@email.com", password: "test123" },
        { email: "test@test.com", password: "Coding1" },
        { email: "s@s.com", password: "123456" },
        {
            email: "example.test@email.com",
            password: "The password",
            name: "notstevie",
        },
        { email: "stevie3@email.com", password: "123456" },
    ];
    return Promise.all(
        allUsers.map(({ email, password }) =>
            signInWithEmailAndPassword(auth, email, password)
                .then(({ user }) => {
                    deleteUser(user);
                    signOut(auth);
                    return user.uid;
                })
                .catch(() => {
                    // console.log(email, "Failed to sign in")
                })
        )
    )
        .then((uids) =>
            Promise.all(
                uids
                    .filter((x) => x === undefined)
                    .map((uid) =>
                        remove(ref(db, `users/${uid}`)).catch(() => {
                            // console.log("Delete Auth error")
                        })
                    )
            )
        )
        .then(() =>
            Promise.all(
                startWith.map(({ email, password }) =>
                    createUserWithEmailAndPassword(auth, email, password)
                        .then(({ user }) => {
                            signOut(auth);
                            return user.uid;
                        })
                        .catch(() => {
                            // console.log(email, "Creating Auth error");
                        })
                )
            )
        )
        .then((IDs) => {
            uids["kieran"] = IDs[0];
            uids["s@s"] = IDs[3];
            uids["notstevie"] = IDs[4];
            uids["s3@email"] = IDs[5];
            return users
                .map((user) => seedUserData(user))
                .concat(maps.map((map) => seedMapData(map)));
        })
        .catch((err) => console.log(err));
};

describe("POST /api/account", () => {
    describe("account", () => {
        test("Should let a user log in", () => {
            const postRequest = {
                email: "kierantesting@email.com",
                password: "Coding1",
            };
            return beforeButOurFunc()
                .then(() =>
                    request(app)
                        .post("/api/account")
                        .send(postRequest)
                        .expect(200)
                )
                .then((response) => {
                    const { uid } = response.body;
                    expect(uid).toBe(uids["kieran"]);
                });
        });
        test("Should return a 404 not found if the email doesn't exist", () => {
            const postRequest = {
                email: "emali@email.com",
                password: "test123",
            };
            return beforeButOurFunc()
                .then(() =>
                    request(app)
                        .post("/api/account")
                        .send(postRequest)
                        .expect(404)
                )
                .then((response) => {
                    const { msg } = response.body;
                    expect(msg).toBe("Email not found");
                });
        });
        test("should return 403 when the incorrect password is passed ", () => {
            const postRequest = {
                email: "email@email.com",
                password: "1234567",
            };
            return beforeButOurFunc()
                .then(() =>
                    request(app)
                        .post("/api/account")
                        .send(postRequest)
                        .expect(403)
                )
                .then((response) => {
                    const { msg } = response.body;
                    expect(msg).toBe("Incorrect password");
                });
        });
        test("should return 400 when body is formatted incorrectly", () => {
            const postRequest = `email,password\nemail@email.com,1234`;
            return beforeButOurFunc()
                .then(() =>
                    request(app)
                        .post("/api/account")
                        .send(postRequest)
                        .expect(400)
                )
                .then((response) => {
                    const { msg } = response.body;
                    expect(msg).toBe("Invalid body format");
                });
        });
    });
});

describe("api/users", () => {
    describe("post", () => {
        it("should be able to create an account with email password", () => {
            const postRequest = {
                email: "usercredential@email.com",
                password: "Coding1",
                name: "testnowwwwwww",
            };
            return beforeButOurFunc()
                .then(() =>
                    request(app)
                        .post("/api/users")
                        .send(postRequest)
                        .expect(201)
                )
                .then((response) => {
                    const { uid } = response.body;
                    expect(uid).toEqual(expect.any(String));
                });
        });
        it("should return 403 when an e-mail already exists", () => {
            const postRequest = {
                email: "test@test.com",
                password: "Coding1",
                name: "hello",
            };
            return beforeButOurFunc()
                .then(() =>
                    request(app)
                        .post("/api/users")
                        .send(postRequest)
                        .expect(403)
                )
                .then((response) => {
                    const msg = response.body.msg;
                    expect(msg).toEqual("Email already in use");
                });
        });
        it("should return invalid password and 400 ", () => {
            const postRequest = {
                email: "test5@test.com",
                password: "Codin",
                name: "lksjdf",
            };
            return beforeButOurFunc()
                .then(() =>
                    request(app)
                        .post("/api/users")
                        .send(postRequest)
                        .expect(400)
                )
                .then((response) => {
                    const msg = response.body.msg;
                    expect(msg).toEqual(expect.any(String));
                });
        });
        it("should return an error if the data is formatted incorrectly ", () => {
            const postRequest = `email,password\nemail@test.com,1234`;
            return beforeButOurFunc()
                .then(() =>
                    request(app)
                        .post("/api/account")
                        .send(postRequest)
                        .expect(400)
                )
                .then((response) => {
                    const { msg } = response.body;
                    expect(msg).toBe("Invalid body format");
                });
        });
        it("should accept a username in addition", () => {
            const postRequest = {
                email: "itstillgfworksas@test.com",
                password: "Coding",
                name: "TestUserFinally",
            };
            return beforeButOurFunc()
                .then(() =>
                    request(app)
                        .post("/api/users")
                        .send(postRequest)
                        .expect(201)
                )
                .then((response) => {
                    const { uid } = response.body;
                    expect(uid).toEqual(expect.any(String));
                });
        });
    });
});

describe("GET /api/maps", () => {
    it("should return a list of all maps", () => {
        return request(app)
            .get("/api/maps")
            .expect(200)
            .then((response) => {
                const keys = Object.keys(response.body.maps);
                const testMapObj = {
                    arUrl: expect.any(String),
                    location: {
                        latDelta: 0,
                        latitude: 0,
                        lonDelta: 0,
                        longitude: 0,
                    },
                    mapLocation: "London",
                    mapName: "Geo Map",
                    waypoints: [
                        {
                            latitude: 0,
                            longitude: 0,
                            description: "",
                            code: expect.any(String),
                            title: "clue one",
                        },
                        {
                            latitude: 0,
                            longitude: 0,
                            description: "",
                            code: expect.any(String),
                            title: "clue two",
                        },
                    ],
                };
                expect(keys).toContain("100");
                expect(keys).toContain("101");
                expect(keys).toContain("102");
                expect(response.body.maps[100]).toMatchObject(testMapObj);
            });
    });
});

describe("GET /api/maps/:map_id", () => {
    it("should return the map with the given id", () => {
        return request(app)
            .get("/api/maps/101")
            .expect(200)
            .then((response) => {
                const map = response.body.map;
                const resultMap = {
                    mapName: "Jay Map",
                    mapLocation: "London",
                    waypoints: [
                        {
                            title: "clue one",
                            description: "",
                            latitude: 0,
                            longitude: 0,
                            code: expect.any(String),
                        },
                        {
                            title: "clue two",
                            description: "",
                            latitude: 0,
                            longitude: 0,
                            code: expect.any(String),
                        },
                    ],
                    location: {
                        latitude: 0,
                        longitude: 0,
                        latDelta: 0,
                        lonDelta: 0,
                    },
                };
                expect(map).toEqual(resultMap);
            });
    });
    it("should return a 404 not found if the given id is not currently in use", () => {
        return request(app)
            .get("/api/maps/1000")
            .expect(404)
            .then((response) => {
                const msg = response.body.msg;
                expect(msg).toBe("Error, map not found");
            });
    });
});

describe("DELETE /api/users/:user_id", () => {
    it("should delete the user account", () => {
        const postRequest = {
            email: "s@s.com",
            password: "123456",
        };
        return beforeButOurFunc().then(() =>
            request(app)
                .delete(`/api/users/${uids["s@s"]}`)
                .send(postRequest)
                .expect(204)
        );
    });
});

describe("PATCH /api/users/:user_id", () => {
    describe("Should update username", () => {
        it.only("should return updated username", () => {
            const newUserName = {
                name: "terry",
            };
            return beforeButOurFunc()
                .then(() =>
                    request(app)
                        .patch(`/api/users/${uids["notstevie"]}`)
                        .send(newUserName)
                        .expect(200)
                )
                .then((response) => {
                    const user = response.body;
                    expect(typeof user.name).toBe("string");
                    expect(user.name).toBe("terry");
                });
        });
    });
    describe("Should update email", () => {
        it("should return updated email", () => {
            const newUserEmail = {
                oldEmail: "stevie3@email.com",
                newEmail: "stevie4@email.com",
                password: "123456",
            };
            return beforeButOurFunc().then(() =>
                request(app)
                    .patch(`/api/users/${uids["s3@email"]}`)
                    .send(newUserEmail)
                    .expect(200)
                    .then((response) => {
                        const user = response.body;
                        expect(typeof user.email).toBe("string");
                        expect(user.email).toBe("stevie4@email.com");
                    })
            );
        });
    });
    describe("Should change password", () => {});
});
