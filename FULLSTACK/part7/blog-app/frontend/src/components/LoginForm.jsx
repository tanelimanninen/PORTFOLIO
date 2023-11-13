import { TextField, Button } from '@mui/material';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../reducers/userReducer";
import { handleNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  //EVENTHANDLER FOR LOGIN
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      console.log("logging in with", username, password);
      //LOGIN USER
      dispatch(loginUser(username, password));
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      //SHOW ERROR MESSAGE
      dispatch(handleNotification("Wrong username of password", 5, "error"));
    }
  };

  return (
    <div>
      <h2>Log In</h2>

      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id="username"
            label="username"
            type="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
