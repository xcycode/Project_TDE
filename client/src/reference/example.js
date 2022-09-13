import React from "react";
// import "./App.css";
import axios from "axios";

const ACC = () => {
  axios.defaults.headers.common['Authorization'] = 12345;
  const instance = axios.create({
    baseURL: "https://reqres.in/api",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });

  const instanceData = () => {
    instance.get("/users").then((res) => console.log(res));
  };

  axios.defaults.baseURL = "https://reqres.in/api";

  const getData = () => {
    axios.get("/users").then(({ data: data }) => console.log(data));
  };

  const config = {
    data: {
      name: "John Doe",
      job: "Junior Developer",
    },
    headers: {
      "content-type": "application/json",
    },
  };

  const postData = () => {
    axios
      .post("/users", config)
      .then((res) => console.log(res.data))
      .catch((res) => console.log(res));
  };

  const updateData = async () => {
    try {
      const res = await axios.put("/2", {
        name: "Jane Doe",
        job: "Senior Developer",
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = () => {
    axios.delete("/2").then((res) => console.log(res.status));
  };

  const multiple = () => {
    Promise.all([
      axios.get("https://reqres.in/api/users?page=2"),
      axios.post("https://reqres.in/api/users", config),
    ]).then((res) => console.log(res[0], res[1]));
  };

  return (
    <>
      <div className='grid'>
        <button style={style} onClick={getData}>
          Get
        </button>
        <button style={style} onClick={postData}>
          Post
        </button>
        <button style={style} onClick={updateData}>
          Update
        </button>
        <button style={style} onClick={deleteData}>
          Delete
        </button>
        <button style={style} onClick={instanceData}>
          Instance
        </button>
        <button style={style} onClick={multiple}>
          Multiple
        </button>
        <button style={style} onClick={multiple}>
          測試按鈕
        </button>
      </div>
    </>
  );
};

export default ACC;

const style = {
  backgroundColor: "black",
  color: "white",
  padding: "4px 8px",
  border: "none",
  borderRadius: "4px",
  display: "block",
  marginBottom: "4px",
  fontWeight: "bold",
};
