import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

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

export default Course