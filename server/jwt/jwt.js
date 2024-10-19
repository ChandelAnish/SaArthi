const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const setUser = (name,email, password) => {
    const payload = {
        name,
        email,
        password
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