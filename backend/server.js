const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Complete DevOps Project",
    completed: false
  },
  {
    id: 2,
    title: "Deploy using Jenkins",
    completed: true
  }
];


// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Task Manager Backend Running");
});


// GET TASKS
app.get("/tasks", (req, res) => {
  res.json(tasks);
});


// ADD TASK
app.post("/tasks", (req, res) => {

  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };

  tasks.push(newTask);

  res.json(newTask);
});


// DELETE TASK
app.delete("/tasks/:id", (req, res) => {

  tasks = tasks.filter(
    task => task.id != req.params.id
  );

  res.json({
    message: "Task Deleted"
  });
});


// TOGGLE COMPLETE
app.put("/tasks/:id", (req, res) => {

  tasks = tasks.map(task => {

    if(task.id == req.params.id){
      task.completed = !task.completed;
    }

    return task;
  });

  res.json({
    message: "Task Updated"
  });
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});