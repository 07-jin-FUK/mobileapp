const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// MongoDB接続
mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  nickname: String,
  birthday: Date,
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.json());
app.use(cors());

app.post("/register", async (req, res) => {
  console.log("Received request:", req.body); // リクエストをログに記録
  try {
    const user = new User(req.body);
    await user.save();
    console.log("User saved:", user); // ユーザーが保存されたことをログに記録
    res.status(201).send(user);
  } catch (error) {
    console.error("Error saving user:", error); // エラーをログに記録
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
