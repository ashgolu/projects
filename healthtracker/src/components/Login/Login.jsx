import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "./login.css"
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigator = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {
    email,password})
    .then(response => {
      if (response.data === 'success') {
        console.log('Login successful');
        navigator('/home');
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
  };

  return (
    
        <div className="container" id='LoginForm'>
        <Form onSubmit={handleSubmit} id='form'>
      <Form.Group controlId="formBasicEmail" id='formBasicEmail'>
      <h1 className='Login'>Login</h1>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        <Form.Text className="text-muted" >
          <p id='FormText'>We'll never share your email with anyone else.</p>
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword" id='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" id='formBasicSubmit'>
        Submit
      </Button>
      <Link to={"/register"}  className='btn btn-danger' variant="danger"id='formBasicSubmit'>Register</Link>
    </Form>
    </div>
  );
};

export default LoginForm;