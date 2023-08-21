import Part from "./Part"

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

export default Content