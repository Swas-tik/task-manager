import React, { useState } from "react";
import "./taskbuilder.css";
import { Link, useNavigate } from "react-router";
import { useDispatch} from "react-redux";
import { addTask,  } from "../store/taskSlice";
import { Logout } from "../store/authSlice";


const TaskBuilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  const [data, setData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    dispatch(Logout()); // ✅ Clear Redux state
    sessionStorage.removeItem("loggedInUser"); // ✅ Remove user from sessionStorage
    navigate("/"); // ✅ Redirect to login
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.title || !data.description || !data.dueDate) {
      alert("Please fill in all fields!");
      return;
    }

      // Create a new task object with a unique ID
      const newTask = {
        id: Date.now(), // Generate a unique ID
        ...data,
        status: "pending", // Default status
        username: loggedInUser.username,
      };
      dispatch(addTask(newTask)); // Dispatch action to Redux

      // Reset form after submitting
      setData({ title: "", description: "", dueDate: "" });
 
      navigate("/dashboard");
  }
     

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Task</Link>
          </li>
        <li>
        <button onClick={handleLogout} className="logout">Logout</button>
        </li>
        </ul>
      </nav>

      <div className="task-builder-container">
        <h1>Create New Task</h1>

        <form className="task-form">
          <label>
            Title
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Due Date
            <input
              type="date"
              name="dueDate"
              value={data.dueData}
              onChange={handleChange}
            />
          </label>
          <button type="submit" onClick={handleSubmit}>
            Create Task
          </button>
        </form>
      </div>
    </>
  );
};

export default TaskBuilder;
