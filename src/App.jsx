import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard";
import TaskBuilder from "./pages/TaskBuilder";
import { Provider } from "react-redux";
import Store from "./store/Store";
import './App.css'
import EditTask from "./pages/EditTask";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-task" element={<TaskBuilder />} />
            <Route path="/edit-task/:id" element={<EditTask/>}/>
          </Routes>

          <Footer/>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
