import Dropdown from "../ui/Dropdown";
import VSCIcon from "../assets/vsc-icon.png";
import useInputStore from "../stores/inputStore";
import { ReactNode, useEffect, useState } from "react";
import problems from "../problems";
import parseProblem from "../lib/parser";
import { fs } from "@tauri-apps/api";
import { toast } from "react-toastify";
import { join } from "@tauri-apps/api/path";
import { Command } from "@tauri-apps/api/shell";

export default function ProblemDetails() {
    const currentProblem = useInputStore((state) => state.currentProblem);
    const currentLanguage = useInputStore((state) => state.currentLanguage);
    // TODO: move path to a separate store
    const path = useInputStore((state) => state.path);
    const setCurrentLanguage = useInputStore(
        (state) => state.setCurrentLanguage
    );
    const [parsedProblem, setParsedProblem] = useState<ReactNode[]>([]);

    async function openInCode() {
        const problem = problems[currentProblem];
        const problemPath = await join(path as string, problem.title);

        // Check NodeJS is installed
        const npmCheckCommand = new Command("test-node");

        npmCheckCommand.on("error", () => {
            // TODO: return on error
            toast.error("Please ensure that NodeJS is installed");
        });

        await npmCheckCommand.spawn();

        if (!(await fs.exists(problemPath))) {
            fs.createDir(problemPath);
            const jsFilePath = await join(problemPath, "index.js");
            const jestFilePath = await join(problemPath, "test.js");
            const instructionsFilePath = await join(
                problemPath,
                "instructions.md"
            );
            const problemDescriptionFilePath = await join(
                problemPath,
                "problem.md"
            );

            await fs.writeFile(
                instructionsFilePath,
                `# Problem Instructions

- Write your solution code inside the \`solution()\` function.
- To test your code, run \`node test\` in your command line
- We recommend that you install the [Markdown All in One Extension](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) to read the problem description inside Visual Studio Code
`
            );

            await fs.writeFile(
                problemDescriptionFilePath,
                `# ${problem.title}\n\n${
                    problem.description
                }\n\n${problem.examples.map(
                    (example, idx) =>
                        `### Example ${idx + 1}: \n\n> **Input:** \`${
                            example.input
                        }\` \\ \n> **Output:** \`${
                            example.output
                        }\` \\ \n> **Explanation:** \`${
                            example.explanation
                        }\` \n\n`
                )}${
                    problem.constraints.length != 0
                        ? `\n### Constraints:\n${problem.constraints.map(
                              (constraint) => `- ${constraint}`
                          )}`
                        : ""
                }`
            );

            await fs.writeFile(
                jsFilePath,
                `function solution(${problem.args}) {

}

module.exports = solution;`
            );

            let jestContents = `const solution = require("./index");\n\n function test() {`;

            let testNumber = 1;
            for (const args in problem.testCases) {
                const expected = JSON.stringify(problem.testCases[args]);
                jestContents += `let result_${testNumber} = JSON.stringify(solution(${args}));
if (result_${testNumber} === JSON.stringify(${expected}))
    console.log("\\x1b[32mTest ${testNumber}: PASSED\\x1b[0m\\nInput: solution(${args})\\nExpected: ${expected}\\nGot: " + result_${testNumber} + "\\n");
else {
    console.error("\\x1b[31mTest ${testNumber}: FAILED\\x1b[0m\\nInput: solution(${args})\\nExpected: ${expected}\\nGot: " + result_${testNumber}); return; }
`;
                testNumber++;
            }

            jestContents +=
                "console.log('\\n\\x1b[32mYou passed, congratulations!\\x1b[0m')}\ntest();";

            await fs.writeFile(jestFilePath, jestContents);
        }

        const openVSCommand = new Command("open-code", [problemPath]);
        await openVSCommand.spawn();
    }

    useEffect(() => {
        // We parse our custom markdown instead as it's much more secure (not that it matters for a desktop app for now, but good practise)
        // TODO(conaticus): Cache the parsed problems
        setParsedProblem(parseProblem(problems[currentProblem]));
    }, [currentProblem]);

    return (
        <div className="w-full p-4 text-xl md:text-lg">
            <div className="flex">
                <h3 className="mb-4 mr-4 md:text-2xl">
                    {problems[currentProblem].title}
                </h3>
                <Dropdown
                    choice={currentLanguage}
                    setChoice={setCurrentLanguage}
                    options={["JavaScript"]}
                />
                <button
                    onClick={openInCode}
                    className="code-btn ml-auto flex items-center gap-2 bg-gray-medium font-semibold rounded-full px-6 h-10 transition duration-200 ease-in-out hover:bg-opacity-50"
                >
                    Open in Code
                    <img
                        width="20"
                        src={VSCIcon}
                        alt="Visual Studio Code Icon"
                    />
                </button>
            </div>

            {parsedProblem}
        </div>
    );
}
