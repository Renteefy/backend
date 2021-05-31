"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = exports.healthCheck = void 0;
const nanoid_1 = require("nanoid");
const jwt_1 = require("../../config/jwt");
const user_service_1 = require("./user.service");
const healthCheck = (req, res) => {
    res.send("healthy");
};
exports.healthCheck = healthCheck;
const login = async (req, res) => {
    const { email } = req.body;
    let user = await user_service_1.getUserObjFromEmail_service(email);
    if (user === null)
        return res
            .status(401)
            .send({ status: "no_user_found", message: "No user found" });
    return res
        .status(200)
        .send({ username: user.username, token: jwt_1.signJWT(user.userID) });
};
exports.login = login;
const signup = async (req, res) => {
    const { email, pfp, name, username } = req.body;
    let user = await user_service_1.getUserObjFromEmail_service(email);
    if (user !== null)
        return res.status(200).send({
            status: "user_exists",
            message: "user exists, Login instead",
        });
    const newUser = {
        email: email,
        name: name,
        profilePict: pfp,
        isRentee: false,
        isRenter: false,
        username: username,
        wallet: 0,
        userID: "user-" + nanoid_1.nanoid(),
    };
    if (await user_service_1.addUser_service(newUser))
        return res.status(200).send({
            message: "Success",
            token: jwt_1.signJWT(newUser.userID),
        });
    return res.status(500).send({ message: "something went wrong" });
};
exports.signup = signup;
