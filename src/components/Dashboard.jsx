import React, { useState } from "react";
import "./dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { Logout } from "../store/authSlice";
import { completeTask, deleteTask, updateTask } from "../store/taskSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTasks = useSelector((state) => state.tasks.tasks);
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const [dropdownTask, setDropdownTask] = useState(null);
  const userTasks = allTasks.filter(
    (task) => task.username === loggedInUser.username
  );

  const handleEdit = (task) => {
    dispatch(updateTask(task)); // Store selected task in Redux
    navigate("/edit-task/" + task.id);
    setDropdownTask(null); 
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id)); // Remove task from Redux
    setDropdownTask(null); 
  };

  const handleComplete = (id) => {
    dispatch(completeTask(id));
    setDropdownTask(null); 
  };

  const handleLogout = () => {
    dispatch(Logout());
    sessionStorage.removeItem("loggedInUser");
    navigate("/"); // Redirect to login page
  };

  const toggleDropdown = (taskId) => {
    setDropdownTask(dropdownTask === taskId ? null : taskId);
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/create-task">Add Task</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      <div className="task-container">
        <h1>Welcome, {loggedInUser?.username}!</h1>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userTasks?.map((tasks) => {
              return (
                <tr key={tasks.id}>
                  <td>{tasks.title}</td>
                  <td>{tasks.dueDate}</td>
                  <td>{tasks.status}</td>
                  <td>
                    <button className="edit" onClick={() => handleEdit(tasks)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(tasks.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="complete"
                      onClick={() => handleComplete(tasks.id)}
                    >
                      Complete
                    </button>

                    {/* Dropdown button for mobile */}
                    <div className="dropdown-container">
                    <button
                      className="dropdown-toggle"
                      onClick={() => toggleDropdown(tasks.id)}
                    >
                      Action
                    </button>
                    {dropdownTask === tasks.id && (
                      <div className="task-dropdown show-dropdown">
                        <button onClick={() => handleEdit(tasks)}>Edit</button>
                        <button onClick={() => handleDelete(tasks.id)}>
                          Delete
                        </button>
                        <button onClick={() => handleComplete(tasks.id)}>
                          Complete
                        </button>
                      </div>
                    )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
