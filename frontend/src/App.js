import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserSideHome from './Pages/UserSide/UserSideHome';
import UserSideLogin from './Pages/UserSide/UserSideLogin'
import UserSideSignup from './Pages/UserSide/UserSideSignup';
import UserProfile from './Components/User/UserProfile/UserProfile';
import AdminSideLogin from './Pages/AdminSide/AdminSideLogin';
import AdminSideHome from './Pages/AdminSide/AdminSideHome';
import AdminUserCreate from './Components/Admin/AdminUserCreate/AdminUserCreate'
import AdminUserEdit from './Components/Admin/AdminUserEdit/AdminUserEdit';
import NotFound from './Pages/NotFound';

function App() {
  useEffect(() => {
  },[]);
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <UserSideHome />
          </Route>
          <Route path='/userlogin'>
            <UserSideLogin />
          </Route>
          <Route path='/usersignup'>
            <UserSideSignup />
          </Route>
          <Route path='/userprofile'>
            <UserProfile />
          </Route>
          <Route path='/adminlogin'>
            <AdminSideLogin />
          </Route>
          <Route path='/adminhome'>
            <AdminSideHome />
          </Route>
          <Route path='/admincreateuser'>
            <AdminUserCreate />
          </Route>
          <Route path='/adminedituser'>
            <AdminUserEdit />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
