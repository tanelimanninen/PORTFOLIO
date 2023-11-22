import { Link } from "react-router-dom";

const Menu = () => {
    const style = {
        backgroundColor: '#FF8A8A',
        border: '2px solid #5E4F4F',
        paddingTop: 10,
        paddingBottom: 10
    }

  const padding = {
    paddingLeft: 5,
    paddingRight: 5
  }

  return (
    <div style={style}>
      <Link style={padding} to="/">Authors</Link>
      <Link style={padding} to="/books">Books</Link>
      <Link style={padding} to="/add_book">Add Book</Link>
      <Link style={padding} to="/recommendations">Recommended</Link>
    </div>
  )
}

export default Menu