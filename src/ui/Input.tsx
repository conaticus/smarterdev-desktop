interface Props {
    className?: string;
    placeholder?: string;
    value: string;
    setValue: (val: string) => void;
}

export default function Input({
    className,
    placeholder,
    value,
    setValue,
}: Props) {
    return (
        <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className={className}
            placeholder={placeholder}
        />
    );
}
