import Input from "../ui/Input";

export default function Menu() {
    return (
        <div className="border-b border-gray-light h-12 pl-6 flex space-x-8">
            <button className="menu-btn">File</button>
            <button className="menu-btn">Settings</button>
            <Input
                setValue={() => {}}
                value=""
                placeholder="Search Problems"
                className="w-full bg-transparent border-x"
            />
        </div>
    );
}
