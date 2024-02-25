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
    args: string;
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
        args: "a, b", // TODO: Multi language support
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
        args: "nums, target",
        testCases: {
            "[2,5,7,12], 7": [0, 1],
            "[12,6,4], 16": [0, 2],
            "[4,9,1,21,4], 8": [0, 4],
            "[2,4,5,1], 10": [],
        },
    },
    {
        title: "Reverse Integer",
        difficulty: ProblemDifficulty.Easy,
        description:
            "Given a 32-bit signed integer, `x`, return `x` with its digits reversed. \\ If reversing `x` causes the value to go outside the signed 32-bit integer range, return `0`. \\ Assume the environment does not allow storing signed 64-bit integers (so only 32-bit integers are allowed, with values ranging from `-2^31` to `2^31` - 1).",
        examples: [
            {
                input: "123",
                output: "321",
                explanation: "Reverse of 123 is 321.",
            },
            {
                input: "-123",
                output: "-321",
                explanation: "Reverse of -123 is -321.",
            },
            {
                input: "120",
                output: "21",
                explanation:
                    "Reverse of 120 is 21. Note that the leading zero is dropped.",
            },
            {
                input: "0",
                output: "0",
                explanation: "Reverse of 0 is 0.",
            },
        ],
        constraints: [
            "`-2^31 <= x <= 2^31 - 1`",
            "The input is a 32-bit signed integer (stored in a signed 32-bit integer variable, whose range is from `-2^31` to `2^31 - 1)",
        ],
        args: "x",
        testCases: {
            "123": 321,
            "-123": -321,
            "120": 21,
            "0": 0,
        },
    },
];

export default problems;
