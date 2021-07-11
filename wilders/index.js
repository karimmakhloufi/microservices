const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

app.use(express.json());

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
