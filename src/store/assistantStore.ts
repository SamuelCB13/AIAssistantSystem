import { create } from 'zustand';
import { AssistantForm } from '@/types/assistant';

export interface Assistant extends AssistantForm {
    id: string;
}

interface AssistantState {
    assistants: Assistant[];

    // creación
    addAssistant: (assistant: Assistant) => void;

    // edición
    assistantToEdit: Assistant | null;
    setAssistantToEdit: (assistant: Assistant | null) => void;
    updateAssistant: (assistant: Assistant) => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
    assistants: [],

    addAssistant: (assistant) =>
        set((state) => ({
            assistants: [...state.assistants, assistant],
        })),

    assistantToEdit: null,

    setAssistantToEdit: (assistant) =>
        set({ assistantToEdit: assistant }),

    updateAssistant: (updatedAssistant) =>
        set((state) => ({
            assistants: state.assistants.map((a) =>
                a.id === updatedAssistant.id ? updatedAssistant : a
            ),
            assistantToEdit: null,
        })),
}));
