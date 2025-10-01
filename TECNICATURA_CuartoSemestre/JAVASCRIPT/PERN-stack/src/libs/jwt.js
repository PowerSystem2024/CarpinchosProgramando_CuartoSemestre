import jwt from "jsonwebtoken";

export const createAccessToken = (payLod) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payLod, "xyz123", { expiresIn: "Id"}),
        (err, token) => {
            if (err) reject(err);
            resolve(token);
        }
    })
}