import problems, { ProblemDifficulty } from "../problems";
import useInputStore from "../stores/inputStore";

const difficultyStrings = ["Easy", "Medium", "Hard"];
function difficultyToString(difficulty: ProblemDifficulty): string {
    return difficultyStrings[difficulty];
}

const difficultyColors = ["text-green", "text-orange", "text-red"];
function difficultyToColor(difficulty: ProblemDifficulty): string {
    return difficultyColors[difficulty];
}

export default function ProblemList() {
    const inputStore = useInputStore((state) => state);

    return (
        <div className="mt-4 pl-2">
            <table className="w-[98%]">
                <tbody>
                    <tr>
                        <th className="text-center w-1/12">ID</th>
                        <th className="w-[75%]">Title</th>
                        <th className="text-center">Difficulty</th>
                    </tr>

                    {problems.map(({ title, difficulty }, idx) => (
                        <tr
                            onClick={() => inputStore.setCurrentProblem(idx)}
                            {...(inputStore.currentProblem == idx
                                ? { className: "bg-gray-medium" }
                                : {})}
                            key={idx}
                        >
                            <td className="text-center">{idx + 1}</td>
                            <td>{title}</td>
                            <td
                                className={`text-center ${difficultyToColor(
                                    difficulty
                                )}`}
                            >
                                {difficultyToString(difficulty)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
