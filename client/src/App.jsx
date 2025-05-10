import "./App.css";
import StarterPage from "./components/StarterPage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/register/SignUp";
import Username from "./pages/register/Username";
import Home from "./pages/Home";
import MaybeShowComponent from "./components/MaybeShowComponent";
import Dashboard from "./pages/Dashboard";
import Exercise from "./pages/Exercise";
import Calorie from "./pages/Calorie";
import Nutrition from "./pages/Nutrition";
import ExerciseForm from "./pages/ExerciseForm";
import Food from "./pages/Food";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import FormCheck from "./pages/FormCheck";
import AnatomyLayout from "./pages/anatomy/AnatomyLayout";
import Anatomy from "./pages/anatomy/Anatomy";
import BodyAnatomy from "./pages/anatomy/BodyAnatomy";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setAuth, setToken, setUser } from "./redux/authSlice";
import axios from "axios";
import { BACKEND_URL } from "./utils";
import ProtectedRoute from "./pages/ProtectedRoute";
import { setUserMetrics } from "./redux/userSlice";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import LoadingAnimation from "./components/LoadingAnimation";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      dispatch(clearUser());
      navigate("/login");
    }
  }, [token]);
  const authenticateUser = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        dispatch(setAuth(true));
        dispatch(setUser(response.data.user));
        dispatch(setUserMetrics(response.data.metrics));
      }
    } catch (error) {
      console.log(error);
      if (error.response.status >= 401 || error.response.status <= 500) {
        dispatch(clearUser());
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }
  return (
    <>
      <div className={`flex flex-col   w-screen  h-full `}>
        <ScrollToTop />
        <MaybeShowComponent>
          <Navbar />
        </MaybeShowComponent>
        <div className="2xl:container 2xl:mx-auto">
          <Routes>
            {/*  */}
            <Route path="/" element={<Home />} />
            <Route path="/starter/*" element={<StarterPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* Protected Routes  */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/exercise"
              element={
                <ProtectedRoute>
                  <Exercise />
                </ProtectedRoute>
              }
            />
            <Route
              path="/exercise/create"
              element={
                <ProtectedRoute>
                  <ExerciseForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/exercise/edit/:id"
              element={
                <ProtectedRoute>
                  <ExerciseForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/body-anatomy"
              element={
                <ProtectedRoute>
                  <BodyAnatomy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/anatomy/:category"
              element={
                <ProtectedRoute>
                  <AnatomyLayout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/anatomy/details/:id"
              element={
                <ProtectedRoute>
                  <Anatomy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calories"
              element={
                <ProtectedRoute>
                  <Calorie />
                </ProtectedRoute>
              }
            />
            <Route
              path="/food"
              element={
                <ProtectedRoute>
                  <Food />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings authenticateUser={authenticateUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/form-check"
              element={
                <ProtectedRoute>
                  <FormCheck />
                </ProtectedRoute>
              }
            />
            <Route
              path="/nutrition"
              element={
                <ProtectedRoute>
                  <Nutrition />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup/username"
              element={
                <ProtectedRoute>
                  <Username />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
