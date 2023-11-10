import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

//GET ALL BLOGS
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

//POST NEW BLOG
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

//UPDATE A BLOG
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

//DELETE A BLOG
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

//GET ALL COMMENTS OF A BLOG tällä hetkellä turha, koska blogit palauttaa jo kommentit osana objektiaan
const getComments = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`);
  return request.then((response) => response.data);
};

//POST NEW COMMENT
const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};

export default {
  getAll,
  create,
  update,
  remove,
  getComments,
  createComment,
  setToken,
};
