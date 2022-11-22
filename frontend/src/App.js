// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TeamSchedulePage from "./pages/TeamSchedulePage/TeamSchedulePage";
import JoinTeamPage from "./pages/JoinTeamPage/JoinTeamPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/teamschedule/:teamId"
          element={
            <PrivateRoute>
              <TeamSchedulePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/join"
          element={
            <PrivateRoute>
              <JoinTeamPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
