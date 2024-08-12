const { UserSchema } = require("../schemas/UserSchema");
const { model } = require("mongoose");

module.exports = model("User", UserSchema);
