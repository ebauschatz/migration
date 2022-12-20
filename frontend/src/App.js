// General Imports
import { Routes, Route } from "react-router-dom";
import useAuth from './hooks/useAuth';
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TeamEventPage from "./pages/TeamEventPage/TeamEventPage";
import JoinEventPage from "./pages/JoinEventPage/JoinEventPage";
import RacesPage from "./pages/RacesPage/RacesPage";
import RaceDetailPage from "./pages/RaceDetailPage/RaceDetailPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [user, token] = useAuth();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage user={user} token={token} />
            </PrivateRoute>
          }
        />
        <Route
          path="/teamevent/:teamId"
          element={
            <PrivateRoute>
              <TeamEventPage token={token} />
            </PrivateRoute>
          }
        />
        <Route
          path="/join"
          element={
            <PrivateRoute>
              <JoinEventPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/races"
          element={
            <PrivateRoute>
              <RacesPage token={token} />
            </PrivateRoute>
          }
        />
        <Route
          path="/races/:raceId"
          element={
            <PrivateRoute>
              <RaceDetailPage token={token} />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
