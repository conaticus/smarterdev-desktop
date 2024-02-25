import Menu from "./components/Menu";
import ProblemDetails from "./components/ProblemDetails";
import ProblemList from "./components/ProblemList";
import { usePath } from "./hooks/settings";
import useInputStore from "./stores/inputStore";
import Input from "./ui/Input";
import { open } from "@tauri-apps/api/dialog";
import { fs } from "@tauri-apps/api";
import { documentDir, join, sep } from "@tauri-apps/api/path";
import { useEffect, useState } from "react";
import FolderIcon from "./assets/folder-icon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const inputStore = useInputStore((state) => state);
    const [pathInput, setPathInput] = useState(""); // Default path here
    usePath();

    const [defaultPath, setDefaultPath] = useState("");

    async function getDefaultPath() {
        const path = await join(await documentDir(), "smarterdev", "problems");
        setDefaultPath(path);
        setPathInput(path);
    }

    useEffect(() => {
        getDefaultPath();
    }, []);

    async function openPathDialog() {
        const chosenPath = (await open({
            directory: true,
            multiple: false,
            defaultPath,
        })) as string | null;

        if (chosenPath) setPathInput(chosenPath);
    }

    async function savePath() {
        if (pathInput.length == 0) {
            toast.error("Invalid file path");
            return;
        }

        try {
            const targetPath = pathInput.normalize();
            const directories = targetPath.split(sep);
            let currentPath = directories[0] || sep;

            for (let i = 1; i < directories.length; i++) {
                currentPath = await join(currentPath, directories[i]);
                if (!(await fs.exists(currentPath)))
                    await fs.createDir(currentPath);
            }

            await fs.writeFile(
                "./settings.json",
                JSON.stringify({ path: pathInput })
            );
        } catch {
            toast.error("Invalid file path");
            return;
        }

        inputStore.setPath(pathInput);
    }

    if (inputStore.path === null) {
        return (
            <div className="m-auto text-center mt-48 space-y-6">
                <div>
                    <h1 className="mb-4">Hey There!</h1>
                    <h2>
                        Please choose a folder to practise your problems in :)
                    </h2>
                </div>
                <div className="flex justify-center space-x-4">
                    <Input
                        value={pathInput}
                        setValue={setPathInput}
                        className="w-7/12 h-12 rounded-lg bg-gray-darker"
                    />
                    <img
                        onClick={openPathDialog}
                        className="cursor-pointer w-12"
                        src={FolderIcon}
                    />
                </div>

                <button
                    onClick={savePath}
                    className="text-xl font-bold bg-blue hover:bg-opacity-50 transition-all duration-200 rounded-lg px-12 py-3"
                >
                    Go!
                </button>

                <ToastContainer theme="dark" position="top-right" />
            </div>
        );
    }

    return (
        <div className="h-full">
            <Menu />
            <div className="flex w-full min-h-screen">
                <div className="border-r border-gray-light w-full">
                    <ProblemList />
                </div>

                <ProblemDetails />
            </div>
        </div>
    );
}

export default App;
