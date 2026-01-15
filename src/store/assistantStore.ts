import { create } from 'zustand';

export type Assistant = {
    id: string;
    name: string;
    language: string;
    tone: string;
    description: string;
    responseLength: {
        short: number;
        medium: number;
        long: number;
    };
    audioEnabled: boolean;
};

type AssistantStore = {
    assistants: Assistant[];
    addAssistant: (assistant: Assistant) => void;
};

export const useAssistantStore = create<AssistantStore>((set) => ({
    assistants: [],
    addAssistant: (assistant) =>
        set((state) => ({
            assistants: [...state.assistants, assistant],
        })),
}));
