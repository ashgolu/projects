import WorkoutTracker from "./components/WorkoutTracker/WorkoutTracker";
import DailyWorkoutData from "./components/DailyWorkoutData/ExerciseForm";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import RegisterForm from "./components/Register/RegisterPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";

const exercises = [
  { id: 1, name: 'Push-ups' },
  { id: 2, name: 'Sit-ups' },
  { id: 3, name: 'Squats' },
];
function Router() {
  return (
    // <div className="App">
    //   <Navbar/>
    //   {/* <WorkoutTracker/>
    //   <DailyWorkoutData exercises= { exercises } /> */}
    //   {/* <Login/> */}
    //   <RegisterForm/>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Navbar/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
