import { CoursePart } from "../types";

interface PartProps {
    part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <b>{part.name}: {part.exerciseCount}</b>
            <p>"{part.description}"</p>
          </div>
        );
  
      case "group":
        return (
          <div>
            <b>{part.name}: {part.exerciseCount}</b>
            <p>Group Projects: {part.groupProjectCount}</p>
          </div>
        );
  
      case "background":
        return (
          <div>
            <b>{part.name}: {part.exerciseCount}</b>
            <p>"{part.description}"</p>
            <p>{part.backgroundMaterial}</p>
          </div>
        );

      case "special":
        return (
            <div>
                <b>{part.name}: {part.exerciseCount}</b>
                <p>"{part.description}"</p>
                <p>Requirements: {part.requirements.join(', ')}</p>
            </div>
        )
  
        default:
        // Ensure exhaustive type checking
        return assertNever(part);
    }
};
  
// Helper function to ensure exhaustive type checking
const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
  
export default Part;