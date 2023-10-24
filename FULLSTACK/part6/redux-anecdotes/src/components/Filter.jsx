import { useSelector, useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const filter = useSelector((state) => state.filter)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const newFilter = event.target.value
        dispatch(filterChange(newFilter))
    }

    const style = {
      marginBottom: 20
    }
  
    return (
      <div style={style}>
        filter 
        <input
            value={filter}
            onChange={handleChange}
        />
      </div>
    )
  }
  
  export default Filter