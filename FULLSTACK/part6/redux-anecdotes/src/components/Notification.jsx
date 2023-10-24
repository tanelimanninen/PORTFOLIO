import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 15,
    borderWidth: 2
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification