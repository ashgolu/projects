import React, { useEffect, useState } from "react";
import axios from "axios";

const ExerciseData = () => {
    const [exercises, setExercises] = useState([]); 
    const [selectExercise, setSelectExercise] = useState("");

    const fetchExercises = async () => {
        try {
            const response = await axios.get('http://localhost:3001/home/workout', { withCredentials: true });
            setExercises(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const exerciseDataFeed = () => {
      return exercises.map((exercise, index) => (
          <option key={index} value={exercise.name}>{exercise.name}</option>
      ));
    };

    const selectDataFn = (e) => {
        setSelectExercise(e.target.value);
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    return (
        <>
            <h1>Exercise List</h1>
            <select value={selectExercise} onChange={selectDataFn}>
                <option value="" disabled>Select an exercise</option>
                {exerciseDataFeed()}
            </select>
            <p>Selected Exercise: {selectExercise}</p>
        </>
    );
};

export default ExerciseData;
