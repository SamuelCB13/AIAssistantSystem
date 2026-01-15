import { create } from 'zustand';
import { Assistant } from '@/types/assistant';

interface AssistantState {
    assistants: Assistant[];

    // create / edit (ya los tienes)
    addAssistant: (assistant: Assistant) => void;
    updateAssistant: (assistant: Assistant) => void;
    assistantToEdit: Assistant | null;
    setAssistantToEdit: (assistant: Assistant | null) => void;

    // 🗑️ delete
    assistantToDelete: Assistant | null;
    setAssistantToDelete: (assistant: Assistant | null) => void;
    deleteAssistant: (id: string) => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
    assistants: [],

    addAssistant: (assistant) =>
        set((state) => ({
            assistants: [...state.assistants, assistant],
        })),

    updateAssistant: (updated) =>
        set((state) => ({
            assistants: state.assistants.map((a) =>
                a.id === updated.id ? updated : a
            ),
            assistantToEdit: null,
        })),

    assistantToEdit: null,
    setAssistantToEdit: (assistant) => set({ assistantToEdit: assistant }),

    // 🗑️ delete
    assistantToDelete: null,
    setAssistantToDelete: (assistant) => set({ assistantToDelete: assistant }),

    deleteAssistant: (id) =>
        set((state) => ({
            assistants: state.assistants.filter((a) => a.id !== id),
            assistantToDelete: null,
        })),
}));
