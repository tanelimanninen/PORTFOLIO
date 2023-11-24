const Notification = ({ setMessage }) => {
    if ( !setMessage ) {
      return null
    }
    return (
      <div style={{ 
        backgroundColor: '#FFBF00', 
        padding: 5, 
        marginTop: 10, 
        fontWeight: 'bold',
        border: '2px solid #5E4F4F',
        }}>
        {setMessage}
      </div>
    )
}

export default Notification