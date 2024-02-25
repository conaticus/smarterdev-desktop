interface Props {
    options: string[];
    choice: string;
    setChoice: (choice: string) => void;
}

<div
    style={{
        display: "flex",
        justifyContent: "space-between",
    }}
>
    <div>
        <img />
        <h1>Horizon Creations</h1>
    </div>

    <h3>Tech Your Way</h3>
</div>;

export default function Dropdown({ options, choice, setChoice }: Props) {
    return (
        <select value={choice} onChange={(e) => setChoice(e.target.value)}>
            {options.map((option, idx) => (
                <option key={idx} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}
