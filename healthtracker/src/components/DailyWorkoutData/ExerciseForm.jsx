import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'; 
import "./exerciseForm.css";

const ExerciseForm = ({ exercises }) => {
  
  // exercise name and components
  const [selectedExercise, setSelectedExercise] = useState("");
  const [data, setData] = useState({ time: '', reps: '', weight: '' });

  // Workout info state which needs to send to backend
  const[onAddData,setOnAddData]=useState({})

  // managing state of time,sets,reps
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Reset data when exercise changes
  const handleExerciseChange = (e) => {
    setSelectedExercise(e.target.value);
    setData({ time: '', reps: '', weight: '' }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exerciseData = { [selectedExercise]: data };
    setOnAddData(exerciseData); 
    console.log(onAddData);
  };

  return (
    <div className="container"id='container'>
      <form onSubmit={handleSubmit} className='Form'>
        <div className="form-group">
          <label htmlFor="exercise">Exercise</label>
          <select 
            id="exercise" 
            className="form-control" 
            value={selectedExercise} 
            onChange={handleExerciseChange}
          >
            <option value="">Select Exercise</option>
            {exercises.map(exercise => (
              <option key={exercise.id} value={exercise.name}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="text"
            id="time"
            className="form-control"
            name="time"
            value={data.time}
            onChange={handleInputChange}
            placeholder="Enter time"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reps">Reps</label>
          <input
            type="number"
            id="reps"
            className="form-control"
            name="reps"
            value={data.reps}
            onChange={handleInputChange}
            placeholder="Enter reps"
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            id="weight"
            className="form-control"
            name="weight"
            value={data.weight}
            onChange={handleInputChange}
            placeholder="Enter weight"
          />
        </div>
      </form>
      <Button className='AddDataBtn'  variant="primary" type="submit" size="sm">Add Data</Button>
    </div>
  );
};

export default ExerciseForm;