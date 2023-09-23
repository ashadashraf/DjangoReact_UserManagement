import React from 'react'
import UserHeader from '../../Components/User/UserHeader/UserHeader';
import UserBanner from '../../Components/User/UserBanner/UserBanner';
import UserFooter from '../../Components/User/UserFooter/UserFooter';
import { useHistory } from 'react-router-dom';

function UserSideHome() {
  const history = useHistory();
  console.log(1);
  const token = JSON.parse(localStorage.getItem('authTokens'))

  return (
    <div className='UserSideHome'>
      <UserHeader />
      {token ? <UserBanner /> : history.push('/userlogin')}
      <UserFooter />
    </div>
  );
}

export default UserSideHome;