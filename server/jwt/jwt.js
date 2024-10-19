const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const setUser = (name,email, password, profileImageURL, disability) => {
    const payload = {
        name,
        email,
        password,
        profileImageURL,
        disability
    }
    return jwt.sign(payload, secret)
}

const getUser = (token) => {
    if (!token) {
        return null;
    }
    return jwt.verify(token, secret);
}

module.exports = { setUser, getUser } 