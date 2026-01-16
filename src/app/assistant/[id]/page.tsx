"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@pheralb/toast";

import { useAssistantStore } from "@/store/assistantStore";
import { AssistantHeader } from "../components/AssistantHeader";
import { TrainingPanel } from "../components/TrainingPanel";
import { ChatPanel } from "../components/ChatPanel";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

export default function AssistantTrainingPage() {
    const { id } = useParams<{ id: string }>();

    // ===== STORE =====
    const assistants = useAssistantStore((s) => s.assistants);

    const trainingRules = useAssistantStore((s) => s.trainingRules);
    const saveTraining = useAssistantStore((s) => s.saveTraining);
    const isSavingTraining = useAssistantStore((s) => s.isSavingTraining);

    const chats = useAssistantStore((s) => s.chats);
    const addUserMessage = useAssistantStore((s) => s.addUserMessage);
    const addAssistantMessage = useAssistantStore((s) => s.addAssistantMessage);
    const resetChat = useAssistantStore((s) => s.resetChat);
    const isTyping = useAssistantStore((s) => s.isTyping[id]);

    // ===== DATA =====
    const assistant = assistants.find((a) => a.id === id);
    const messages = chats[id] || [];

    // ===== LOCAL STATE =====
    const [rules, setRules] = useState("");
    const [input, setInput] = useState("");

    // ===== EFFECTS =====
    useEffect(() => {
        if (id && trainingRules[id]) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRules(trainingRules[id]);
        }
    }, [id, trainingRules]);

    // ===== GUARDS =====
    if (!assistant) {
        return (
            <section className="p-6 text-white">
                <p>Asistente no encontrado 😕</p>
            </section>
        );
    }

    // ===== HANDLERS =====
    const handleSaveTraining = async () => {
        await saveTraining(assistant.id, rules);

        toast.success({
            text: "Entrenamiento guardado con éxito.",
        });
    };

    const handleSubmitChat = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        addUserMessage(id, input);
        setInput("");

        await addAssistantMessage(id);
    };

    // ===== RENDER =====
    return (
        <section className="flex flex-col p-5 sm:p-8 space-y-5">
            {/* Header */}
            <AssistantHeader assistant={assistant} />

            <aside className="flex flex-col lg:flex-row items-start justify-center gap-5 max-w-7xl mx-auto w-full animate-fadeIn">
                {/* Training */}
                <TrainingPanel
                    rules={rules}
                    onChange={setRules}
                    onSave={handleSaveTraining}
                    isSaving={isSavingTraining}
                />

                {/* Chat */}
                <ChatPanel
                    messages={messages}
                    input={input}
                    onInputChange={setInput}
                    onSubmit={handleSubmitChat}
                    onReset={() => resetChat(id)}
                    isTyping={isTyping}
                />
            </aside>

            <footer className="flex items-center md:justify-start justify-center gap-5 max-w-7xl mx-auto w-full animate-fadeIn">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-white bg-black hover:bg-neutral-800 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center border border-neutral-800 cursor-pointer"
                >
                    <MoveLeftIcon className="" />
                    Volver atrás
                </Link>
            </footer>
        </section>
    );
}
