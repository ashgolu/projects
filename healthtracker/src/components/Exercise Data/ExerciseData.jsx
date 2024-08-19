import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ExerciseData.css";

const ExerciseData = () => {
    const [exercises, setExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const searchInputRef = useRef(null);
    const dropdownRef = useRef(null);

    const fetchExercises = async () => {
        try {
            const response = await axios.get('http://localhost:3001/home/workout', { withCredentials: true });
            setExercises(response.data);
            setFilteredExercises(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === "") {
            setFilteredExercises(exercises);
        } else {
            const filtered = exercises.filter(exercise =>
                exercise.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredExercises(filtered);
        }

        setShowOptions(true);
    };

    const handleOptionClick = (exercise) => {
        setSearchTerm(exercise.name);
        setShowOptions(false);
        addExerciseToTable(exercise);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    const addExerciseToTable = (exercise) => {
        const isAlreadySelected = selectedExercises.some(selected => selected._id === exercise._id);
        if (!isAlreadySelected) {
            setSelectedExercises([...selectedExercises, { ...exercise, time: '', weights: '', reps: '', sets: '', distance: '' }]);
        } else {
            alert("This exercise is already in the list.");
        }
    };

    const handleInputChange = (e, exerciseId, field) => {
        const { value } = e.target;
        setSelectedExercises(selectedExercises.map(exercise =>
            exercise._id === exerciseId ? { ...exercise, [field]: value } : exercise
        ));
    };

    const handleDeleteExercise = (exerciseId) => {
        setSelectedExercises(selectedExercises.filter(exercise => exercise._id !== exerciseId));
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmitExercises = async () => {
        try {
            const isoDate = new Date(date).toISOString().split('T')[0];

            // Map selectedExercises to the correct format
            const formattedExercises = selectedExercises.map((exercise) => ({
                name: exercise.name,
                time: exercise.time,
                weights: exercise.weights,
                reps: exercise.reps,
                sets: exercise.sets,
                distance: exercise.distance
            }));

            const exerciseData = {
                date: isoDate,
                exercises: formattedExercises // Use the array of exercise objects
            };
            console.log(exerciseData);

            const response = await axios.post(
                'http://localhost:3001/home/workout/exerciseData',
                exerciseData, // Send the formatted exercise data
                { withCredentials: true }
            );

            if (response.status === 201) {
                alert("Exercises submitted successfully!");
            }
        } catch (error) {
            console.error("Error submitting exercises:", error);
            alert("Failed to submit exercises.");
        }
    };


    useEffect(() => {
        fetchExercises();
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="exercise-container">
            <h1>Exercise List</h1>
            <input
                type="text"
                placeholder="Search or select an exercise"
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={() => setShowOptions(true)}
                ref={searchInputRef}
                className="search-input"
            />
            {showOptions && (
                <ul className="options-list" ref={dropdownRef}>
                    {filteredExercises.map((exercise) => (
                        <li key={exercise._id} onClick={() => handleOptionClick(exercise)}>
                            {exercise.name}
                        </li>
                    ))}
                </ul>
            )}

            <h2>Selected Exercises</h2>
            <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="date-input"
            />
            {selectedExercises.length > 0 ? (
                <table className="selected-exercises-table">
                    <thead>
                        <tr>
                            <th>Exercise Name</th>
                            <th>Time</th>
                            <th>Weights</th>
                            <th>Reps</th>
                            <th>Sets</th>
                            <th>Distance</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedExercises.map((exercise) => (
                            <tr className="selected-exercises-table-tableRow" key={exercise._id}>
                                <td>{exercise.name}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercise.time}
                                        onChange={(e) => handleInputChange(e, exercise._id, 'time')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercise.weights}
                                        onChange={(e) => handleInputChange(e, exercise._id, 'weights')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercise.reps}
                                        onChange={(e) => handleInputChange(e, exercise._id, 'reps')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercise.sets}
                                        onChange={(e) => handleInputChange(e, exercise._id, 'sets')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercise.distance}
                                        onChange={(e) => handleInputChange(e, exercise._id, 'distance')}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteExercise(exercise._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No exercises selected.</p>
            )}
            {selectedExercises.length > 0 && (
                <button
                    className="btn btn-success"
                    onClick={handleSubmitExercises}
                >
                    Submit All Exercises
                </button>
            )}
        </div>
    );
};

export default ExerciseData;
