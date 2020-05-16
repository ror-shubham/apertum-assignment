import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";
import {UserCard} from "../components/Card";
import './Users.css'

const usersApi = 'https://apertum-interview.herokuapp.com/api/users';


export const Users = () => {
  let history = useHistory();
  const [users, changeUsers] = useState([]);
  const [isFiltered, changeIsFiltered] = useState(false);
  const [isLoading, changeLoading] = useState(false);

  useEffect(() => {
    let authtoken = localStorage.getItem("auth-token");
    if (authtoken === null) history.push('/login');
    async function getUsers() {
      changeLoading(true);
      const response = await fetch(usersApi, {
        headers: {
          Accept: "application/json",
          "Authorization": "Bearer "+authtoken,
        },
        method: "GET"
      });

      if (response.status === 403) {
        localStorage.removeItem("auth-token");
        history.push('/login');
      }
      const result = await response.json();
      changeUsers(result);
      changeLoading(false);
    }
    getUsers()
  }, [history]);
  const signout = () => {
    localStorage.removeItem("auth-token");
    history.push('/login');
  };
  const usersSelected =
    isFiltered ?
      users.filter(user => (user.age >= 20) && (user.age < 30) && ((user.firstName + user.lastName).length >= 10))
      :
      users;
  return (
    <div className="users-parent">
      <div>
        <Button variant="contained" onClick={signout} color="primary" className="signout">Sign Out</Button>
      </div>
      <div>
        <Tooltip title="Users with age >= 20 and < 30, full name length >= 10">
          <Button variant="contained" onClick={() => changeIsFiltered(!isFiltered)} color="secondary">Toggle Filter</Button>
        </Tooltip>
      </div>
      {
        isLoading ?
          <CircularProgress />  :
          <div className="users-list">
            {usersSelected.map(user => {
              return (
                <UserCard user={user} key={user.accountId}/>
              )
            })}
          </div>
      }
    </div>
  )
};
