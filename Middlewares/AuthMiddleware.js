const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  console.log("Received headers:", req.headers);
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.json({ status: false, message: "Invalid token format" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    console.log(token);
    if (err) {
      console.log(err);
      return res.json({ status: false });
    } else {
      try {
        const user = await User.findById(data.id);
        console.log(user);
        if (user) return res.json({ status: true, user: user.username });
        else return res.json({ status: false });
      } catch (err) {
        console.log(err);
      }
    }
  });
};
