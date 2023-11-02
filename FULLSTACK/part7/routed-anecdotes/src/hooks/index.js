import { useState } from 'react'

//CUSTOM HOOK 1
export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const onReset = () => {
        setValue('')
    }

    return {
      type,
      value,
      onChange,
      onReset
    }
}