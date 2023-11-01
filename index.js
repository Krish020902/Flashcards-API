require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000; // You can change the port as needed

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Word model
const Word = mongoose.model("Word", {
  word: String,
  definition: String,
});

app.use(express.json());

// Define a route to insert data
app.post("/insertWords", async (req, res) => {
  console.log("called");
  try {
    const words = req.body;
    console.log("called");
    console.log(req.body);

    // Insert the array of objects into the database
    await Word.insertMany(words);

    res.status(201).json({ message: "Words inserted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while inserting words" });
  }
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/fetchData", async (req, res) => {
  try {
    const users = await Word.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data from MongoDB" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
