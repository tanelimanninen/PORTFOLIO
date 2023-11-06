import { useState } from 'react'
import axios from 'axios'

//CUSTOM HOOK 1
export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
//CUSTOM HOOK 2
export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    //FETCH ALL DATA FROM SERVER
    const getAll = async () => {
      const request = axios.get(baseUrl)
      const response = await request
      setResources(response.data)
    }
  
    //CREATE NEW DATA TO SERVER
    const create = (resource) => {
      return axios
        .post(baseUrl, resource)
        .then((response) => {
          setResources([...resources, response.data])
        })
    }
  
    const service = {
      getAll, create
    }
  
    return [
      resources, service
    ]
}