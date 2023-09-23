import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import FormData from 'form-data';
// import { history } from '../../../Pages/history';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';


function UserSignup() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [place, setPlace] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userDatas = {
      username, phone_number: phoneNumber, email, user_bio: bio, place, profile_image: image, password, password2: confirmPassword,
    };
    console.log(image);
    const userData = new FormData();
    for (const key in userDatas) {
      if (userDatas.hasOwnProperty(key)) {
        userData.append(key, userDatas[key]);
      }
    }
    for (const entry of userData.entries()) {
      const [key, value] = entry;
      console.log(`Key: ${key}, Value: ${value}`);
    }

    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    event.stopPropagation();
    setValidated(true);
    axios.post(`http://127.0.0.1:8000/api/register/`, userData, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${userData._boundary}`,
      }
    })
    .then((response) => {
      history.push('/userlogin');
      console.log('post success', response.data);
    })
    .catch((error) => {
      alert("error in creating new user", error);
      console.log('failed to post', error);
      console.log('response data:', error.response);
    });
  };

  return (
    <React.Fragment>
      <br />
      <h1>Signup </h1>
      <Container style={{ display: 'flex', justifyContent:'center' }}>
        <Form style={{ width:'60rem' }} noValidate validated={validated} onSubmit={handleSubmit} >
          <Row className="mb-3 mt-3 d-flex justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustomUser">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 mt-3 d-flex justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustomPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="text"
                value={phoneNumber}
                placeholder="Phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 mt-3 d-flex justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustomEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 mt-3 d-flex justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustomBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                required
                type="user_bio"
                value={bio}
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 mt-3 d-flex justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustomPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control
                required
                type="text"
                value={place}
                placeholder="Place"
                onChange={(e) => setPlace(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 mt-3 d-flex justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustomProfileImage">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                required
                type="file"
                accept='image/*'
                onChange={handleImageChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 mt-3 d-flex justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustomPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className='mb-3 mt-3 d-flex justify-content-center'>
            <Form.Group as={Col} md="4" controlId="validationCustomPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Button type="submit">Signup</Button>
        </Form>
      </Container>
      <br />
      <Card.Link style={{cursor: 'pointer'}} onClick={() => history.push('/userlogin')}>already user? Login</Card.Link>
      <br />
      <br />
    </React.Fragment>
  );
}

export default UserSignup;