import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './WorkoutTracker.css';
import axios from 'axios';

const ExerciseTracker = () => {


    const [exercises, setExercises] = useState([]);
    const [newExercise, setNewExercise] = useState({ name: '' });

    //this fn is handling the changes while add exercies
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExercise(prevExercise => ({
            ...prevExercise,
            [name]: value
        }));
    };

    // Add exercise to the table
    const addExercise = () => {
        setExercises(prevExercises => [...prevExercises, { ...newExercise, id: exercises.length + 1 }]);
        console.log(exercises);
    };
    const tableListDisplay = () => {
        return (<table>
            <thead>
                <tr>
                    <th>Exercise</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map(exercise => (
                    <tr key={exercise.id}>
                        <td>{exercise.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>)
    }
    const PostExercise = () => {
        const data = newExercise;
        console.log(data);
        axios.post('http://localhost:3001/home/workout',{ exercises: ['Push-ups']}, {withCredentials:true}
        ).then(response => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <div className='Exercises'>
                <h2> Exercises</h2>
                <div className='container'>
                    <InputGroup className="inputGroup">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Exercise name"
                            aria-label="Exercise name"
                            aria-describedby="basic-addon2"
                            value={newExercise.name}
                            onChange={handleInputChange}
                            className="col-6"
                            required
                        />
                        <Button variant="primary" id="button-addon2" onClick={addExercise}>
                            Button
                        </Button>
                        <Button variant="primary" id="button-addon2" onClick={PostExercise}>
                            Submit
                        </Button>

                    </InputGroup>
                </div>
                <div className="tableList">
                    {tableListDisplay()}
                </div>
            </div>
        </>
    );
};

export default ExerciseTracker;