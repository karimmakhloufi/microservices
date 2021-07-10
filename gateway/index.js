const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

app.get("/", async (req, res) => {
  try {
    const wilders = await axios.get("http://wilders:5000/wilders/");
    res.send(wilders.data);
  } catch (err) {
    console.log("an error occurred");
    console.log(err);
    res.status(400).send("an error occurred");
  }
});

app.listen(port, () => {
  console.log(`Gateway ready at http://localhost:${port}`);
});
