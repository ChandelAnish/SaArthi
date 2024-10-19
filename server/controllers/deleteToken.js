const deleteToken = (req, res) => {
  res.clearCookie("SaArthi_Token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    domain: "localhost",
  });

  res.status(200).json({ message: "SaArthi_Token deleted successfully" });
};

module.exports = { deleteToken };
