import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../reducers/userReducer";

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
          Username:
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="log-in-button" className="log-in-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
