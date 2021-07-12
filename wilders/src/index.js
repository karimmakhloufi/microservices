const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

app.use(express.json());

var amqp = require("amqplib/callback_api");

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

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", JSON.parse(msg.content));
      },
      {
        noAck: true,
      }
    );
  });
});

const wilders = [
  {
    name: "Karim",
    role: "Instructor",
  },
];

app.get("/wilders", async (req, res) => {
  let skills;
  let result = wilders;
  try {
    const skillsData = await axios.get("http://skills:5000/skills");
    skills = skillsData.data;
  } catch (err) {
    console.log("err");
  }
  console.log("result", result);
  if (skills) {
    result.map((wilder) => {
      console.log("wilder", wilder);
      const skilledWilder = skills.find(
        (tempSkilledWilder) => tempSkilledWilder.name === wilder.name
      );
      if (skilledWilder && skilledWilder.skills) {
        wilder.skills = skilledWilder.skills;
      }
      return wilder;
    });
  }
  res.send(result);
});

app.post("/wilder", (req, res) => {
  console.log("post wilder", req.body);
  wilders.push(req.body);
  res.send("ok");
});

app.listen(port, () => {
  console.log("wilders ready");
});
