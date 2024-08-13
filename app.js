require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const Holding = require("./models/Holding.js");
const Position = require("./models/Position.js");
const { Signup, Login } = require("./Controllers/AuthController.js");
const cookieParser = require("cookie-parser");
const { userVerification } = require("./Middlewares/AuthMiddleware.js");

const port = process.env.PORT || 8080;

const uri = process.env.MONGO_URL;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "https://main.d10x8axsum38x.amplifyapp.com",
      "http://localhost:5173",
      "https://main.d13rik7kqr4223.amplifyapp.com",
    ],
    credentials: true,
  })
);

main()
  .then(() => {
    console.log("Connected to Db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(uri);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.get("/allholdings", async (req, res) => {
  let allHoldings = await Holding.find({});
  res.send(JSON.stringify(allHoldings));
});

app.get("/allpositions", async (req, res) => {
  let allPositions = await Position.find({});
  res.send(JSON.stringify(allPositions));
});

app.post("/signup", Signup);
app.post("/login", Login);
app.post("/", userVerification);

app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
