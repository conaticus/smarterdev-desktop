import { Language } from "./lib/templates";

export enum ProblemDifficulty {
    Easy,
    Medium,
    Hard,
}

export interface ProblemExample {
    input: string;
    output: string;
    explanation: string;
}

export interface Problem {
    title: string;
    difficulty: ProblemDifficulty;
    description: string;
    examples: ProblemExample[];
    constraints: string[];
    testCases: {
        [key: string]: any;
    };
    functionArgs: Record<Language, string>;
}

const problems: Problem[] = [
    {
        title: "Add Two Numbers",
        difficulty: ProblemDifficulty.Easy,
        description:
            "This is a practise problem to learn how to use **smarterdev**. Your goal is to return the sum of two numbers `a` and `b`.",
        examples: [
            {
                input: "a = 1, b = 2",
                output: "3",
                explanation: "1 + 2 = 3",
            },
        ],
        constraints: [],
        testCases: {
            "1, 2": 3,
            "5, 5": 10,
            "0, 0": 0,
        },
        functionArgs: {
            JavaScript: "a, b",
            TypeScript: "a: number, b: number",
        },
    },
    {
        title: "Two Sum",
        difficulty: ProblemDifficulty.Easy,
        description:
            "Given an array of integers, `nums` and an integer `target`, return the **two** array indexes that add up to `target`. \\ Each input has ***exactly*** one solution, and you may not use the same index twice. \\ Your answer can be returned in any order.",
        examples: [
            {
                input: "nums = [2, 5, 7, 12], target = 7",
                output: "[0, 1]",
                explanation: "Because nums[0] + nums[1] = 7, we return [0, 1]",
            },
            {
                input: "nums = [12, 6, 4], target = 16",
                output: "[0, 2]",
                explanation: "Because nums[0] + nums[2] = 16, we return [0, 2]",
            },
            {
                input: "nums = [4, 9, 1, 21, 4], target = 8",
                output: "[0, 4]",
                explanation: "Because nums[0] + nums[4] = 8, we return [0, 8]",
            },
        ],
        constraints: [],
        functionArgs: {
            JavaScript: "nums, target",
            TypeScript: "nums: number[], target: number",
        },
        testCases: {
            "[2,5,7,12], 7": [0, 1],
            "[12,6,4], 16": [0, 2],
            "[4,9,1,21,4], 8": [0, 4],
            "[2,4,5,1], 10": [],
        },
    },
];

export default problems;
