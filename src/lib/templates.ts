import { fs, path } from "@tauri-apps/api";
import { Problem } from "../problems";

interface Templates {
    solution: string;
    tests: string;
}

export type Language = "JavaScript" | "TypeScript";
const SOLUTION_TEMPLATES_PATH = "./templates/solutions";
const TESTS_TEMPLATES_PATH = "./templates/tests";

export default class Templater {
    public static toCamelCase(text: string) {
        return text
            .split(" ")
            .map((txt, idx) =>
                idx == 0 ? txt : (txt = txt[0].toUpperCase() + txt.substring(1))
            )
            .join("");
    }

    public static async templateLanguage(
        language: Language,
        problem: Problem
    ): Promise<Templates> {
        const templates = await Templater.openTemplate(language);

        const functionName = Templater.toCamelCase(problem.title);
        const args = problem.functionArgs[language];

        templates.solution = templates.solution.replace("%f", functionName);
        templates.solution = templates.solution.replace("%a", args);

        templates.tests.replace("%f", functionName);

        const testTemplateStartIndex = templates.tests.indexOf("=");
        const testTemplateEndIndex = templates.tests.indexOf("=");

        const testTemplate = templates.tests.substring(
            testTemplateStartIndex + 3,
            testTemplateEndIndex - 3
        );

        templates.tests =
            templates.tests.substring(testTemplateStartIndex - 1) +
            templates.tests.substring(testTemplateEndIndex + 1);

        let tests = "";
        let testNumber = 1;
        for (const callArguments in problem.testCases) {
            const expectedResult = problem.testCases[callArguments];
            tests +=
                testTemplate
                    .replace("%ca", callArguments)
                    .replace("%e", expectedResult)
                    .replace("%i", String(testNumber)) + "\n\n";

            testNumber++;
        }

        templates.tests.replace("%t", tests);

        return templates;
    }

    // TODO: Cache all templates on startup
    private static async openTemplate(language: Language): Promise<Templates> {
        const templates: Templates = { solution: "", tests: "" };

        if (language == "TypeScript") {
            templates.solution = await fs.readTextFile(
                await path.join(SOLUTION_TEMPLATES_PATH, language)
            );

            templates.tests = await fs.readTextFile(
                await path.join(TESTS_TEMPLATES_PATH, "JavaScript")
            );

            return templates;
        }

        templates.solution = await fs.readTextFile(
            await path.join(SOLUTION_TEMPLATES_PATH, language)
        );
        templates.tests = await fs.readTextFile(
            await path.join(TESTS_TEMPLATES_PATH, language)
        );

        return templates;
    }
}
