const path = require("path");
const Holding = require("../models/Holding.js");
const Position = require("../models/Position.js");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { holdings, positions } = require("./data.js");
const mongoose = require("mongoose");

const uri = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("Hi");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(uri);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initDb = async () => {
  await Holding.deleteMany({});
  await Holding.insertMany(holdings);
  await Position.deleteMany({});
  await Position.insertMany(positions);
  console.log("THe data has been added");
};
initDb();
