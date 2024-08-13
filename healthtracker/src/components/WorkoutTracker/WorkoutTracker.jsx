import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import './WorkoutTracker.css';

const ExerciseTracker = () => {
    const [exercises, setExercises] = useState([]);
    const [newExercise, setNewExercise] = useState({ name: '' });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExercise(prevExercise => ({
            ...prevExercise,
            [name]: value
        }));
    };


    // Display table
    const tableListDisplay = () => (
        <table>
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>ID</th>
                    <th>Creation time</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map(exercise => (
                    <tr key={exercise._id}>
                        <td>{exercise.name}</td>
                        <td>{exercise._id}</td>
                        <td>{exercise.date}</td>
                        <td><button onClick={() => deleteExercise(exercise._id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // Post exercise to the backend
    const PostExercise = () => {
        axios.post('http://localhost:3001/home/workout', newExercise, { withCredentials: true })
            .then(response => {
                console.log(response);
                setNewExercise({ name: '' });
                fetchExercises();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const fetchExercises = async () => {
        try {
            const response = await axios.get('http://localhost:3001/home/workout', { withCredentials: true });
            setExercises(response.data);
        } catch (err) {
            console.error(err);
        }
    };


    // Function to delete an exercise
    const deleteExercise = async (exerciseId) => {
        try {
            await axios.delete(`http://localhost:3001/home/workout/${exerciseId}`, { withCredentials: true });
            fetchExercises();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    return (
        <>
            <div className='Exercises'>
                <h2>Exercises</h2>
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
