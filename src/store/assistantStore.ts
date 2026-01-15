import { create } from 'zustand';
import { Assistant } from '@/types/assistant';

// Chat
export type ChatMessage = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
};

const SIMULATED_RESPONSES = [
    'Claro, puedo ayudarte con eso. 🚀',
    'Entendido. ¿Deseas que lo hagamos paso a paso? 📝',
    'Buena pregunta, aquí tienes una posible solución. 💡',
    'Perfecto, tomaré en cuenta tus instrucciones. ✍🏻',
    'Déjame analizarlo un momento... 🤔',
    'Esa es una excelente pregunta. Déjame explicarte... 📚',
];

interface AssistantState {
    assistants: Assistant[];
    nextId: number;

    // Crear y editar
    addAssistant: (assistant: Omit<Assistant, 'id'>) => void;
    updateAssistant: (assistant: Assistant) => void;
    assistantToEdit: Assistant | null;
    setAssistantToEdit: (assistant: Assistant | null) => void;

    // Eliminar
    assistantToDelete: Assistant | null;
    setAssistantToDelete: (assistant: Assistant | null) => void;
    deleteAssistant: (id: string) => void;

    // Entrenamiento
    trainingRules: Record<string, string>;
    isSavingTraining: boolean;
    saveTraining: (id: string, rules: string) => Promise<void>;

    // Chat
    chats: Record<string, ChatMessage[]>;
    isTyping: Record<string, boolean>;
    addUserMessage: (assistantId: string, message: string) => void;
    addAssistantMessage: (assistantId: string) => Promise<void>;
    resetChat: (assistantId: string) => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
    assistants: [],
    nextId: 1,

    // Crear y editar
    addAssistant: (assistant) =>
        set((state) => ({
            assistants: [
                ...state.assistants,
                {
                    ...assistant,
                    id: String(state.nextId),
                },
            ],
            nextId: state.nextId + 1,
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

    // Eliminar
    assistantToDelete: null,
    setAssistantToDelete: (assistant) => set({ assistantToDelete: assistant }),

    deleteAssistant: (id) =>
        set((state) => ({
            assistants: state.assistants.filter((a) => a.id !== id),
            assistantToDelete: null,
        })),

    // Entrenar
    trainingRules: {},
    isSavingTraining: false,

    saveTraining: async (id, rules) => {
        set({ isSavingTraining: true });

        await new Promise((res) => setTimeout(res, 1000));

        set((state) => ({
            trainingRules: {
                ...state.trainingRules,
                [id]: rules,
            },
            isSavingTraining: false,
        }));
    },

    // Chat
    chats: {},
    isTyping: {},

    addUserMessage: (assistantId, message) =>
        set((state) => ({
            chats: {
                ...state.chats,
                [assistantId]: [
                    ...(state.chats[assistantId] || []),
                    {
                        id: crypto.randomUUID(),
                        role: 'user',
                        content: message,
                    },
                ],
            },
        })),

    addAssistantMessage: async (assistantId) => {
        set((state) => ({
            isTyping: {
                ...state.isTyping,
                [assistantId]: true,
            },
        }));

        const delay = Math.random() * 1000 + 1000;
        await new Promise((res) => setTimeout(res, delay));

        const response =
            SIMULATED_RESPONSES[
                Math.floor(Math.random() * SIMULATED_RESPONSES.length)
            ];

        set((state) => ({
            chats: {
                ...state.chats,
                [assistantId]: [
                    ...(state.chats[assistantId] || []),
                    {
                        id: crypto.randomUUID(),
                        role: 'assistant',
                        content: response,
                    },
                ],
            },
            isTyping: {
                ...state.isTyping,
                [assistantId]: false,
            },
        }));
    },

    resetChat: (assistantId) =>
        set((state) => ({
            chats: {
                ...state.chats,
                [assistantId]: [],
            },
        })),
}));
