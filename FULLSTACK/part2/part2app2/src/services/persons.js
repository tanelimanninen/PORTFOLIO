import axios from 'axios'
const baseUrl = '/api/persons'

//GET
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//POST
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

//DELETE
const deleteSelected = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

//PUT
const update = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deleteSelected, update }