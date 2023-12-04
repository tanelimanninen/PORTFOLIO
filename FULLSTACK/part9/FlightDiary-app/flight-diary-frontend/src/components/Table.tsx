import { DiaryEntry } from "../types";

interface Props {
    diaries: DiaryEntry[]
}

const Table = ({ diaries } : Props) => {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th id='table-header'>Date</th>
                    <th id='table-header'>Weather</th>
                    <th id='table-header'>Visibility</th>
                </tr>
                </thead>
                <tbody>
                {diaries.map(diary => (
                    <tr key={diary.id} >
                    <td id='table-row'>{diary.date}</td>
                    <td id='table-row'>{diary.weather}</td>
                    <td id='table-row'>{diary.visibility}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default Table;