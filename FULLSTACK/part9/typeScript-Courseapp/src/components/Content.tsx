import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
            <Part part={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;
