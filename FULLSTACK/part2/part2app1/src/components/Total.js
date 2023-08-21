//COMPONENT FOR THE TOTAL SUM OF EXERCISES
const Total = ({ course }) => {
  
    const result = course.parts.reduce((sum, part) => {
    console.log(sum)
    console.log(part)
  
    return sum + part.exercises
    }, 0)
    
    console.log(result)
  
    return (
      <p>Number of exercises: {result}</p>
    )
  }

export default Total