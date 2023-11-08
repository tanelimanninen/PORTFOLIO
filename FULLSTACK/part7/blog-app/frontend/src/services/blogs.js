import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

//GET
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

//POST
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

//PUT
const update = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const object = response.data;
  console.log(object);

  const updatedObject = {
    ...object,
    likes: object.likes + 1,
  };
  console.log(updatedObject);

  const putResponse = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return putResponse.data;
};

//DELETE
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, update, remove, setToken };
