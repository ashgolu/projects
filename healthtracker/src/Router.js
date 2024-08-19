import WorkoutTracker from "./components/WorkoutTracker/WorkoutTracker";
//import DailyWorkoutData from "./components/DailyWorkoutData/ExerciseForm";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import RegisterForm from "./components/Register/RegisterPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExercisData from "./components/Exercise Data/ExerciseData";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Navbar />}>
          <Route path="/home/workout" element={<WorkoutTracker />}></Route>
        </Route>
        <Route path="/home" element={<Navbar />}>
          <Route path="/home/exerciseData" element={<ExercisData />}> </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
