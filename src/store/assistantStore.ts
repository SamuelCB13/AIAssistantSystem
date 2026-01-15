import { create } from "zustand";
import { Assistant } from "@/types/assistant";
import { generateId } from "@/utils/id";

/* 🗨️ Chat */
export type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

interface AssistantState {
    assistants: Assistant[];
    nextId: number;

    // create / edit
    addAssistant: (assistant: Omit<Assistant, "id">) => void;
    updateAssistant: (assistant: Assistant) => void;
    assistantToEdit: Assistant | null;
    setAssistantToEdit: (assistant: Assistant | null) => void;

    // delete
    assistantToDelete: Assistant | null;
    setAssistantToDelete: (assistant: Assistant | null) => void;
    deleteAssistant: (id: string) => void;

    // training
    trainingRules: Record<string, string>;
    isSavingTraining: boolean;
    saveTraining: (id: string, rules: string) => Promise<void>;

    // chat
    chats: Record<string, ChatMessage[]>;
    isTyping: Record<string, boolean>;
    addUserMessage: (assistantId: string, message: string) => void;
    addAssistantMessage: (assistantId: string) => Promise<void>;
    resetChat: (assistantId: string) => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
    // 🧠 asistentes por defecto
    assistants: [
        {
            id: "1",
            name: "Asistente de Ventas",
            description:
                "Asistente especializado en ayudar a los clientes a encontrar los productos adecuados y cerrar ventas.",
            language: "Español",
            tone: "Profesional",
            responseLength: {
                short: 30,
                medium: 50,
                long: 20,
            },
            audioEnabled: true,
        },
        {
            id: "2",
            name: "Soporte Técnico",
            description:
                "Asistente enfocado en resolver problemas técnicos de manera eficiente.",
            language: "Inglés",
            tone: "Amigable",
            responseLength: {
                short: 20,
                medium: 30,
                long: 50,
            },
            audioEnabled: false,
        },
    ],

    nextId: 3,

    // create
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

    // edit
    updateAssistant: (updated) =>
        set((state) => ({
            assistants: state.assistants.map((a) =>
                a.id === updated.id ? updated : a
            ),
            assistantToEdit: null,
        })),

    assistantToEdit: null,
    setAssistantToEdit: (assistant) => set({ assistantToEdit: assistant }),

    // delete
    assistantToDelete: null,
    setAssistantToDelete: (assistant) => set({ assistantToDelete: assistant }),

    deleteAssistant: (id) =>
        set((state) => ({
            assistants: state.assistants.filter((a) => a.id !== id),
            assistantToDelete: null,
        })),

    // training
    trainingRules: {
        "1": `Eres un asistente especializado en ventas. Siempre sé cordial y enfócate en identificar necesidades del cliente antes de ofrecer productos.`.trim(),
        "2": `Ayudas a resolver problemas técnicos de manera clara y paso a paso. Siempre confirma que el usuario haya entendido antes de continuar.`.trim(),
    },

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

    // chat
    chats: {},
    isTyping: {},

    addUserMessage: (assistantId, message) =>
        set((state) => ({
            chats: {
                ...state.chats,
                [assistantId]: [
                    ...(state.chats[assistantId] || []),
                    {
                        id: generateId(),
                        role: "user",
                        content: message,
                    },
                ],
            },
        })),

    addAssistantMessage: async (assistantId) => {
        set((state) => ({
            isTyping: { ...state.isTyping, [assistantId]: true },
        }));

        await new Promise((res) =>
            setTimeout(res, 1000 + Math.random() * 1000)
        );

        const responses = [
            'Claro, puedo ayudarte con eso. 🚀',
            'Entendido. ¿Deseas que lo hagamos paso a paso? 📝',
            'Buena pregunta, aquí tienes una posible solución. 💡',
            'Perfecto, tomaré en cuenta tus instrucciones. ✍🏻',
            'Déjame analizarlo un momento... 🤔',
            'Esa es una excelente pregunta. Déjame explicarte... 📚',
        ];

        const reply =
            responses[Math.floor(Math.random() * responses.length)];

        set((state) => ({
            chats: {
                ...state.chats,
                [assistantId]: [
                    ...(state.chats[assistantId] || []),
                    {
                        id: generateId(),
                        role: "assistant",
                        content: reply,
                    },
                ],
            },
            isTyping: { ...state.isTyping, [assistantId]: false },
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
