const express = require("express");
const app = express();
const port = 5000;

const skills = [
  {
    name: "Karim",
    skills: ["react", "js"],
  },
];

app.get("/skills", (req, res) => {
  res.send(skills);
});

app.listen(port, () => {
  console.log("skills ready");
});
