import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom"

import Create from "../src/pages/create/Create"
import Dashboard from "../src/pages/dashboard/Dashboard"
import Login from "../src/pages/login/Login"
import Project from "../src/pages/project/Project"
import Signup from "../src/pages/signup/Signup"

function App() {
  return (
    <div className="App">
      <h4 className='mt-3'>Welcome to my final project!</h4>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<Create />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
