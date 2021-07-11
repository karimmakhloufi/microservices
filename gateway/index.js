const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

app.use(express.json());

app.get("/wilders", async (req, res) => {
  try {
    const wilders = await axios.get("http://wilders:5000/wilders/");
    res.send(wilders.data);
  } catch (err) {
    console.log("an error occurred");
    // console.log(err);
    res.status(400).send("an error occurred");
  }
});

app.post("/wilder", async (req, res) => {
  try {
    const wilders = await axios.post("http://wilders:5000/wilder/", req.body);
    res.send(wilders.data);
  } catch (err) {
    console.log("an error occurred");
    // console.log(err);
    res.status(400).send("an error occurred");
  }
});

app.post("/wilder/skills", async (req, res) => {
  console.log(req.body);
  try {
    await axios.post("http://skills:5000/skill/", req.body);
    res.send("skill created");
  } catch (err) {
    console.log("an error occurred");
    // console.log(err);
    res.status(400).send("an error occurred when creating skill");
  }
});

app.listen(port, () => {
  console.log(`Gateway ready at http://localhost:${port}`);
});
