import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Create from "../src/pages/create/Create"
import Dashboard from "../src/pages/dashboard/Dashboard"
import Login from "../src/pages/login/Login"
import Navbar from './components/Navbar/Navbar';
import Project from "../src/pages/project/Project"
import Sidebar from './components/Sidebar/Sidebar';
import Signup from "../src/pages/signup/Signup"
import useAuthContext from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Sidebar />}
        <div className="Container">
          <Navbar />
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/Dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
            <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
            <Route path="/project/:id" element={user ? <Project /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
