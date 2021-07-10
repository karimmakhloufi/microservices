const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

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
  if (skills) {
    result.map((wilder) => {
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

app.listen(port, () => {
  console.log("wilders ready");
});
