const App = () => {
  //COURSE-OBJECT
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Satulanhaistelua',
        exercises: 17,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

//COMPONENT FOR THE WHOLE COURSE
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

//COMPONENT FOR THE HEADER SECTION
const Header = ({ course }) => <h1>{course.name}</h1>

//COMPONENT FOR THE MAIN CONTENT
const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name}: {part.exercises} exercises.</p>
  )
}

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

export default App;
