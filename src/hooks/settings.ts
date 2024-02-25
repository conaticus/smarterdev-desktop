import { fs } from "@tauri-apps/api";
import useInputStore from "../stores/inputStore";
import { useEffect } from "react";

interface Settings {
    path: string;
}

export async function usePath() {
    const setPath = useInputStore((state) => state.setPath);

    async function getPath() {
        try {
            const settingsRaw = await fs.readTextFile("./settings.json");
            const settings: Settings = JSON.parse(settingsRaw);
            setPath(settings.path);
        } catch {}
    }

    useEffect(() => {
        getPath();
    }, []);
}
