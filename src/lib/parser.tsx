import { Fragment, ReactNode } from "react";
import { Problem } from "../problems";

enum ProblemElementType {
    Text,
    Br,
    Mark,
    Strong,
    I,
    H5,
    Pre,
    Ul,
    Li,
    Whitespace,
}

interface ProblemElement {
    type: ProblemElementType;
    text?: string;
    children: ProblemElement[];
}

export type ProblemTree = ProblemElement[];

const tokens = new Set<string>(["*", "`", "\\"]);

class TextParser {
    private text: string;
    private current: number = 0;
    public keyCounter: number = 0;
    public jsx: ReactNode[] = [];

    constructor(text: string) {
        this.text = text;
    }

    private addJsx(element: ReactNode) {
        this.jsx.push(<Fragment key={this.keyCounter++}>{element}</Fragment>);
    }

    private consumeUntil(breakSubstr: string): string {
        this.next();
        let start = this.current;

        while (this.current < this.text.length) {
            if (
                this.text.substring(
                    this.current,
                    this.current + breakSubstr.length
                ) == breakSubstr
            )
                break;

            this.next();
        }

        const result = this.text.substring(start, this.current);
        this.current += breakSubstr.length - 1;
        return result;
    }

    private peak(): string {
        return this.text[this.current + 1];
    }

    private expect(next: string): boolean {
        return this.peak() == next;
    }

    /** Returns previous character */
    private next(): string {
        return this.text[this.current++];
    }

    public parse(): ReactNode[] {
        while (this.current < this.text.length) {
            const ch = this.text[this.current];
            switch (ch) {
                case "*": {
                    let breaker = "*";

                    if (this.expect("*")) {
                        breaker = "**";
                        this.next();

                        if (this.expect("*")) {
                            breaker = "***";
                            this.next();
                        }
                    }

                    const text = this.consumeUntil(breaker);

                    this.addJsx(
                        <>
                            {" "}
                            {breaker == "*" ? (
                                <i>{text}</i>
                            ) : breaker == "**" ? (
                                <strong>{text}</strong>
                            ) : (
                                <strong>
                                    <i>{text}</i>
                                </strong>
                            )}
                        </>
                    );
                    break;
                }

                case "`": {
                    const text = this.consumeUntil("`");
                    this.addJsx(
                        <>
                            {" "}
                            <mark>{text}</mark>
                        </>
                    );
                    break;
                }

                case "\\": {
                    this.addJsx(
                        <>
                            <br /> <br />
                        </>
                    );

                    break;
                }

                default:
                    let text = "";
                    while (
                        !tokens.has(this.peak()) &&
                        this.current < this.text.length
                    )
                        text += this.next();

                    this.addJsx(<>{text}</>);
                    break;
            }

            this.next();
        }

        return this.jsx;
    }
}

export default function parseProblem(problem: Problem): ReactNode[] {
    const parser = new TextParser(problem.description);
    const jsx = parser.parse();

    let keyCounter = parser.keyCounter;

    function addJsx(element: ReactNode) {
        jsx.push(<Fragment key={keyCounter++}>{element}</Fragment>);
    }

    addJsx(
        <>
            <br />
            <br />
        </>
    );

    problem.examples.forEach((example, idx) => {
        addJsx(<h5>Example {idx + 1}:</h5>);

        addJsx(
            <pre>
                <strong>Input: </strong>
                {example.input}

                <br />

                <strong>Output: </strong>
                {example.output}

                <br />

                <strong>Explanation: </strong>
                {example.explanation}
            </pre>
        );

        addJsx(
            <>
                <br />
                <br />
            </>
        );
    });

    if (problem.constraints.length != 0) addJsx(<h5>Constraints:</h5>);

    addJsx(
        <ul className="list-disc pl-6 space-y-2">
            {problem.constraints.map((constraint, idx) => (
                <li key={idx}>{new TextParser(constraint).parse()}</li>
            ))}
        </ul>
    );

    return jsx;
}
