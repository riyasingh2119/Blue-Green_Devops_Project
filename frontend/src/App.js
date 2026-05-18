import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {

    const res = await axios.get(
      "http://localhost:5000/tasks"
    );

    setTasks(res.data);
  };


  // ADD TASK
  const addTask = async () => {

    if(title === "") return;

    await axios.post(
      "http://localhost:5000/tasks",
      { title }
    );

    setTitle("");

    fetchTasks();
  };


  // DELETE TASK
  const deleteTask = async (id) => {

    await axios.delete(
      `http://localhost:5000/tasks/${id}`
    );

    fetchTasks();
  };


  // TOGGLE TASK
  const toggleTask = async (id) => {

    await axios.put(
      `http://localhost:5000/tasks/${id}`
    );

    fetchTasks();
  };


  useEffect(() => {
    fetchTasks();
  }, []);


  return (
    <div style={{
      padding: "40px",
      fontFamily: "Arial"
    }}>

      <h1>Task Manager DevOps Project</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "10px",
          width: "300px"
        }}
      />

      <button
        onClick={addTask}
        style={{
          padding: "10px",
          marginLeft: "10px"
        }}
      >
        Add
      </button>


      <div style={{ marginTop: "30px" }}>

        {tasks.map(task => (

          <div
            key={task.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >

            <span
              onClick={() => toggleTask(task.id)}
              style={{
                cursor: "pointer",
                textDecoration:
                  task.completed
                  ? "line-through"
                  : "none"
              }}
            >
              {task.title}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;