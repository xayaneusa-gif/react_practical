const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let students = [];
let idCounter = 1;

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// ADD student
app.post("/students", (req, res) => {
  const student = {
    id: idCounter++,
    name: req.body.name,
  };
  students.push(student);
  res.json(student);
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Student Management Backend Running");
});


// Start server
app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000");
});
