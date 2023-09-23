import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Card from 'react-bootstrap/Card';

function AdminLogin() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [authTokens, setAuthTokens] = useState(() => {
    return localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
  });

  const [user, setUser] = useState(() => {
    return localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null;
  });

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const loginAdmin = async (username,password) => {
      const response = await fetch('http://127.0.0.1:8000/api/admintoken/', {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, password
        })
      })

      const data = await response.json()
      console.log(data);

      if(response.status === 200) {
        console.log("Admin Logged in");
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data))
        history.push("/adminhome");

      } else {
        alert(data.detail);
        console.log(response.status);
        console.log('there was a server issue');
      }
    }
    
    const shouldLogin = () => username.length > 0 && loginAdmin(username, password);
    shouldLogin();
    setValidated(true);
  };

  return (
    <React.Fragment>
      <Container style={{ display: 'flex', justifyContent:'center' }}>
        <Form style={{ width:'60rem' }} noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3 mt-5 d-flex justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3 mt-5 d-flex justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
      <br />
      <Card.Link style={{cursor: 'pointer'}} onClick={() => history.push('/usersignup')}>new user? Signup</Card.Link>
    </React.Fragment>
  );
}

export default AdminLogin;