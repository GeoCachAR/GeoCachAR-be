export function firebaseErrors(err, request, response, next) {
  if (err.code === "auth/user-not-found") {
    response.status(404).send({ msg: "Email not found" });
  }
  if (err.code === "auth/wrong-password") {
    response.status(403).send({ msg: "Incorrect password" });
  }
  if (err.code === "auth/email-already-in-use") {
    response.status(403).send({ msg: "Email already in use" });
  }
  if (err.code === "auth/weak-password") {
    response.status(400).send({ msg: "Invalid password" });
  }
  next(err);
}

export const customErrors = (err, request, response, next) => {
  if (err.code && err.msg) {
    response.status(err.code).send({ msg: err.msg });
  }
  response.status(500).send({ msg: "Uncaught error" });
};

export const jsonBodyCheck = (request, response, next) => {
  if (!request.is("application/json"))
    next({ code: 400, msg: "Invalid body format" });
  else next();
};
