const { model } = require("mongoose");

const { HoldingsSchema } = require("../schemas/HoldingsSchema.js");

module.exports = model("Holding", HoldingsSchema);
