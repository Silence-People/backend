const { model } = require("mongoose");

const { OrdersSchema } = require("../schemas/OrdersSchema.js");

module.exports = model("Order", OrdersSchema);
