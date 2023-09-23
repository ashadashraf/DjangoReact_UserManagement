import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import jwt_decode from 'jwt-decode';

function UserBanner() {
  const [data, setData] = useState(null);
  const token = JSON.parse(localStorage.getItem('authTokens'))
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
    }
  }, []);
  return (
    <Container className='mt-4' style={{ display: 'flex', justifyContent: 'center' }}>
      {data && (
        <React.Fragment>
          <div>
            <div className='row'>
              <Card style={{ width: '18rem' }}>
                <h3>Welcome HOME {data.username}</h3>
              </Card>
            </div>
            <div className='row mt-2'> 
              <Button onClick={() => history.push('/userprofile')}>View Profile</Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </Container>
  );
}

export default UserBanner;