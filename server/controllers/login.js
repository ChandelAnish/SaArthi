const user = require("../model/users");
const { setUser } = require("../jwt/jwt");

//login
const login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;

    const userDetails = await user.findOne({ email });
    if (!userDetails) {
      return res.status(400).json({ login: false, msg: "User not exists" });
    } else {
      // console.log(userDetails);
      if (password === userDetails.password) {
        const token = setUser(userDetails.name, email, password, userDetails.profileImageURL);
        // console.log(token)

        res.cookie("SaArthi_Token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return res.status(200).json({ login: true, userDetails, token });
      } else {
        return res
          .status(401)
          .json({ login: false, msg: "Incorrect email or password" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Some error occurred" });
  }
};

module.exports = { login };
