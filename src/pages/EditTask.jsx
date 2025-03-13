import React, { useEffect, useState } from "react";
import "./taskbuilder.css";
import { Link, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../store/taskSlice";

const EditTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editingTask = useSelector((state) => state.tasks.tasks);
  const {id} = useParams()
  const [warning, setWarning] = useState("")
  const [data, setData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
const task = editingTask.find(task=> task.id === parseInt(id))
    if (task) {
      setData(task);
    }
  }, [id,editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.title || !data.description || !data.dueDate) {
      setWarning("Please fill in all fields!");
      return;
    }

      // ✅ Correctly update the existing task
      dispatch(updateTask({ id: parseInt(id), ...data}));

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
            <Link to="/">Logout</Link>
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
          <div className="warning">{warning}</div>
          <button type="submit" onClick={handleSubmit}>
            Create Task
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTask;
