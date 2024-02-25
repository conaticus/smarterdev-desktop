import { create } from "zustand";

interface InputState {
    currentProblem: number;
    currentLanguage: string;
    path: string | null;
}

interface InputAction {
    setCurrentProblem: (idx: InputState["currentProblem"]) => void;
    setCurrentLanguage: (lang: InputState["currentLanguage"]) => void;
    setPath: (path: InputState["path"]) => void;
}

const useInputStore = create<InputState & InputAction>((set) => ({
    currentProblem: 0,
    currentLanguage: "JavaScript",
    path: null,
    setCurrentProblem: (idx) => set(() => ({ currentProblem: idx })),
    setCurrentLanguage: (lang) => set(() => ({ currentLanguage: lang })),
    setPath: (path) => set(() => ({ path })),
}));

export default useInputStore;
