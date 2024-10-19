const { getUser } = require("../jwt/jwt");

const loggedInUserOnly = (req, res, next) => {
  try {
    const token = req.cookies.SaArthi_Token;
    if (!token) {
        res.status(498).json({ login: false, msg: "no token found" });
        return;
    }
    // console.log(token);
    const userDetails = getUser(token);
    // console.log("auth :\n",userDetails);
    req.userDetails=userDetails;// Attached decoded token data to req object
    next();
  } catch (error) {
    console.log("error in middleware");
  }
};

module.exports = loggedInUserOnly;
