const { model } = require("mongoose");

const { PositionsSchema } = require("../schemas/PositionsSchema.js");

module.exports = model("Position", PositionsSchema);
