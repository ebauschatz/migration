// General Imports
import { Routes, Route } from "react-router-dom";
import useAuth from './hooks/useAuth';
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TeamSchedulePage from "./pages/TeamSchedulePage/TeamSchedulePage";
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
          path="/teamschedule/:teamId"
          element={
            <PrivateRoute>
              <TeamSchedulePage token={token} />
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
