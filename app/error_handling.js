export default function handleErrors(err, request, response, next) {
    if (err.code === "auth/user-not-found") {
        response.status(404).send({ msg: "Email not found" });
    }
    response.status(500).send({ msg: "Uncaught error" });
}
