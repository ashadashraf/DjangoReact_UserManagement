import UserHeader from '../UserHeader/UserHeader';
import UserFooter from '../UserFooter/UserFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import jwt_decode from 'jwt-decode';

function UserProfile() {
  const [data, setData] = useState(null);
  const token = JSON.parse(localStorage.getItem('authTokens'));
  const history = useHistory();
  

  useEffect(() => {
    const user = token ? jwt_decode(token.access) : null;
    console.log(user);
    if(token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/user/${user.user_id}/`);
          setData(response.data);
        } catch (error) {
          // history.push('/userlogin');
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    } else {
      history.push('/userlogin');
    }
  }, []);
  return (
    <React.Fragment>
      <UserHeader />
      <Container className='mt-4' style={{ display: 'flex', justifyContent:'center' }}>
        {data && (
        <Card style={{ width: '18rem' }}>
          <div className='d-flex justify-content-center pt-3'><Card.Img variant="top" style={{height:'130px',width:'150px'}} src={data.profile_image} alt='User Image' /></div>
          <Card.Body>
            <Card.Title>Name:- {data.username}</Card.Title>
            <Card.Text>
              Bio:- {data.user_bio}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Email Id :- {data.email}</ListGroup.Item>
            <ListGroup.Item>Phone Number:- {data.phone_number}</ListGroup.Item>
            <ListGroup.Item>Date of Join :- {format(new Date(data.date_joined), 'dd-MMM-yyyy')}</ListGroup.Item>
            <ListGroup.Item>Place :- {data.place}</ListGroup.Item>
          </ListGroup>
          {/* <Card.Body>
            <Card.Link href="#">Logout</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body> */}
        </Card>
        )}
      </Container>
      <UserFooter />
    </React.Fragment>
  );
}

export default UserProfile;