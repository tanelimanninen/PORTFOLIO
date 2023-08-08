//COURSE-OBJECT
const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

const App = () => {
  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  )
}

//COMPONENT FOR THE HEADER SECTION
const Header = () => {
  return (
    <h1>{course.name}</h1>
  )
}

//COMPONENT FOR THE MAIN CONTENT
const Content = () => {
  return (
    <div>
      <p>{course.parts[0].name} {course.parts[0].exercises}</p>
      <p>{course.parts[1].name} {course.parts[1].exercises}</p>
      <p>{course.parts[2].name} {course.parts[2].exercises}</p>
    </div>
  )
}

//COMPONENT FOR THE TOTAL SUM OF EXERCISES
const Total = () => {
  const sum = (p1, p2, p3) => {
    return p1 + p2 + p3
  }

  const result = sum(course.parts[0].exercises, course.parts[1].exercises, course.parts[2].exercises)
  //console.log(result)

  return (
    <p>Number of exercises: {result}</p>
  )
}

/*const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}*/

export default App;
