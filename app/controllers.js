import postLoginDetails from "./models";

const checkLogin = (request, response, next) => {
    const postRequest = request.body;
    postLoginDetails(postRequest)
        .then((uid) => {
            response.status(200).send({ uid: uid });
        })
        .catch((err) => next(err));
};

export default checkLogin;
