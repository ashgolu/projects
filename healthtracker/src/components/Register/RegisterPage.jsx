import { useState, React } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import axios from "axios"

function RegisterForm() {

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState({
    firstnameError: '',
    lastnameError: '',
    emailError: '',
    passwordError: ''
  })

  const emailRegex = /^(([^<>()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:@"]+)*)|(".+"))@(([^<>()[\]\\.,;:@"]+\.)+[^<>()[\]\\.,;:@"]{2,})$/i;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate();


  const calculateStrength = (password) => {
    // Regular expressions for each condition
    const lengthRegex = /.{8,}/;
    const lengthRegexBigger = /.{10,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?/~\\-]/;

    const lengthValid = lengthRegex.test(password);
    const uppercaseValid = uppercaseRegex.test(password);
    const lowercaseValid = lowercaseRegex.test(password);
    const numberValid = numberRegex.test(password);
    const specialCharValid = specialCharRegex.test(password);
    const lengthRegexBiggerValid = lengthRegexBigger.test(password);
    let strength = 0;
    if (lengthValid) strength += 10;
    if (lengthRegexBiggerValid) strength += 10;
    if (uppercaseValid) strength += 20;
    if (lowercaseValid) strength += 20;
    if (numberValid) strength += 20;
    if (specialCharValid) strength += 20;

    return strength;
  };

  const passwordStrength = calculateStrength(formData.password);

  const handleErrors = (e) => {
    const { name, value } = e.target
    if (name === 'firstname') {
      if (value.length < 3) {
        setError({ ...error, firstnameError: 'Atleast 3 characters required' })
      }
      else {
        setError({ ...error, firstnameError: '' })
      }
    }
    else if (name === 'lastname') {
      if (value.length < 3) {
        setError({ ...error, lastnameError: 'Atleast 3 characters required' })
      }
      else {
        setError({ ...error, lastnameError: '' })
      }
    }
    else if (name === 'email') {
      if (!emailRegex.test(value)) {
        setError({ ...error, emailError: 'Enter valid email' })
      }
      else {
        setError({ ...error, emailError: '' })
      }
    }
    else if (name === 'password') {
      if (!passwordRegex.test(value)) {
        setError({ ...error, passwordError: 'Password must contain atleast 8 characters, one uppercase, one lowercase, one number and one special character' })
      }
      else {
        setError({ ...error, passwordError: '' })
      }
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (error.firstnameError === '' && error.lastnameError === '' && error.emailError === '' && error.passwordError === '') {
      axios.post('http://localhost:3001/register', formData)
        .then(response => {
          console.log(response.data);
          navigate('/login');
        }).catch(error => {
          console.error('There was an error!', error);
        });
    }
    else {
      console.log(error);
    }
  };
  const strengthbar =()=>{
    return(
      <div className='strengthBar' id='strengthProgression'>
              <div className="strengthProgression" id='strengthProgression' style={{backgroundColor:"green",width: `${passwordStrength}%`,height:"5px"}}>
              </div>
      </div>
    )
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    handleErrors(e);
  }
  const handleLogin = () => {
    console.log('Navigating to login page');
  };

  return (
    <div className="register-box">
      <h1 id='register'>Register</h1>
      <Form id='registerForm'>
        <Form.Group controlId="formBasicRegister">
          <Form.Label id='label'>First Name</Form.Label>
          <Form.Control type="text" name="firstname" value={formData.firstname} placeholder="Enter first name" onChange={handleChange} />
          <p className='regError'>{error.firstnameError}</p>
        </Form.Group>

        <Form.Group controlId="formBasicRegister">
          <Form.Label id='label'>Last Name</Form.Label>
          <Form.Control type="text" name="lastname" value={formData.lastname} placeholder="Enter last name" onChange={handleChange} />
          <p className='regError'>{error.lastnameError}</p>
        </Form.Group>

        <Form.Group controlId="formBasicRegister">
          <Form.Label id='label'>Email address</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange} />
          <p className='regError'>{error.emailError}</p>
        </Form.Group>

        <Form.Group controlId="formBasicRegister">
          <Form.Label id='label'>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} />
          {(formData.password.length>0)?strengthbar():null}
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleRegister}>
          Register
        </Button>
      </Form>
      <Link to="/login" variant="link" onClick={handleLogin} id='link'>
        Already have an account? Login
      </Link>
    </div>
  );
}

export default RegisterForm;