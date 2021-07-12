const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const skills = [
  {
    name: "Karim",
    skills: ["react", "js"],
  },
];

app.get("/skills", (req, res) => {
  res.send(skills);
});

app.post("/skill", (req, res) => {
  console.log(req.body);
  skills.push(req.body);
  res.send("ok");
});

app.listen(port, () => {
  console.log("skills ready");
});
