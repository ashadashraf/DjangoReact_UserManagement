import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import jwt_decode from 'jwt-decode';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';


function AdminBanner() {
  const [data, setData] = useState(null);
  const [clients, setClients] = useState([]);
  const token = JSON.parse(localStorage.getItem('authTokens'));
  const history = useHistory();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin/");
      setData(response.data);
      setClients(response.data)
      console.log(response.data);
    } catch (error) {
      // history.push('/userlogin');
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/user/${id}`)
    .then((response) => {
      console.log(response.data);
      fetchData();
    })
    .catch((error) => {
      alert(error.data);
    });
  };
  

  useEffect(() => {
    const user = token ? jwt_decode(token.access) : null;
    console.log(user);
    if(token && user.is_staff) {
      fetchData();
    } else {
      history.push('/adminlogin');
    }
  }, []);

  return (
    <React.Fragment>
      <Container className='mt-4' style={{ display: 'flex', justifyContent:'center', background:'lightgray' }}>
        <Row>
          {clients.map((client) => (
            <Col key={client.id} xs={12} sm={6} md={6} lg={4} xl={6}>
              <Card style={{ width: '18rem', margin:'15px' }}>
                {client && (
                <div className='d-flex justify-content-center pt-3'><Card.Img variant="top" style={{height:'130px',width:'150px'}} src={client.profile_image} alt='User Image' /></div>
                )}
                <Card.Body>
                  <Card.Title>Name:- {client.username}</Card.Title>
                  <Card.Text>
                    Bio:- {client.user_bio}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Email Id :- {client.email}</ListGroup.Item>
                  <ListGroup.Item>Phone Number:- {client.phone_number}</ListGroup.Item>
                  {client.date_joined && 
                    <ListGroup.Item>Date of Join :- {format(new Date(client.date_joined), 'dd-MMM-yyyy')}</ListGroup.Item>
                  }
                  <ListGroup.Item>Place :- {client.place}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Card.Link as={Link} to={{ pathname: '/adminedituser', state: {user: client} }}>Edit</Card.Link>
                  <Card.Link style={{cursor:'pointer'}} onClick={() => handleDelete(client.id)}>Delete</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default AdminBanner;