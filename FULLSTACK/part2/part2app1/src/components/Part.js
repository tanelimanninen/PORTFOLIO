//COMPONENT FOR EACH ROW OF CONTENT
const Part = ({ part }) => {
    return (
      <p>{part.name}: {part.exercises} exercises.</p>
    )
  }

export default Part