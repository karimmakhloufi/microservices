const express = require("express");
const axios = require("axios");
const amqp = require("amqplib/callback_api");

const app = express();
const port = 5000;

app.use(express.json());

app.get("/wilders", async (req, res) => {
  try {
    const wilders = await axios.get("http://wilders:5000/wilders/");
    res.send(wilders.data);
  } catch (err) {
    console.log("an error occurred");
    console.log(err);
    res.status(400).send("an error occurred");
  }
});

app.post("/wilder", async (req, res) => {
  try {
    // const wilders = await axios.post("http://wilders:5000/wilder/", req.body);
    amqp.connect("amqp://queue", function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        var queue = "wilder";

        channel.assertQueue(queue, {
          durable: false,
        });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)));

        console.log(" [x] Sent %s", req.body);
      });
    });

    res.send("sent to queue");
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
