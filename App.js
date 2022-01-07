import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function App() {
  return (
    <>
      <MyComponent />
    </>
  );
}

function MyComponent() {
  const [username, setUserName] = useState("");
  const [password, setpassWord] = useState("");
  const [list, setList] = useState([]);

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setpassWord(e.target.value);
  };

  const addUser = async () => {
    const url = "http://localhost:4000/add-user";
    const data = {
      username: username,
      password: password,
    };

    // AJAX using AXIOS
    await axios.post(url, data);

    const newList = [data, ...list];
    setList(newList);

    setUserName("");
    setpassWord("");
  };

  const getUser = async () => {
    const url = "http://localhost:4000/users";
    const result = await fetch(url);
    const list = await result.json();

    const newList = [...list];
    setList(newList);
  };

  useEffect(() => getUser(), []);

  return (
    <div>
      <h1>User Login</h1>
      <div>
        <input
          type="text"
          name=""
          id=""
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter Username"
        />
      </div>
      <div>
        <input
          type="text"
          name=""
          id=""
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter Password"
        />
      </div>
      <div>
        <input type="button" name="" value="Login" onClick={addUser} />
        <input type="button" name="" value="Get User" onClick={getUser} />
      </div>

      <h1>User List</h1>

      {list.map((item, index) => (
        <div key={index}>
          {item.username} {item.password}
        </div>
      ))}
    </div>
  );
}
