"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@pheralb/toast";
import { useAssistantStore } from "@/store/assistantStore";
import { CheckIcon, LoaderPinwheelIcon, RotateCcwIcon, SendHorizontalIcon } from "lucide-react";

export default function AssistantTrainingPage() {
    const { id } = useParams<{ id: string }>();

    const assistants = useAssistantStore((s) => s.assistants);
    const trainingRules = useAssistantStore((s) => s.trainingRules);
    const saveTraining = useAssistantStore((s) => s.saveTraining);
    const isSavingTraining = useAssistantStore((s) => s.isSavingTraining);

    const assistant = assistants.find((a) => a.id === id);

    const chats = useAssistantStore((s) => s.chats);
    const addUserMessage = useAssistantStore((s) => s.addUserMessage);
    const resetChat = useAssistantStore((s) => s.resetChat);

    const addAssistantMessage = useAssistantStore((s) => s.addAssistantMessage);
    const isTyping = useAssistantStore((s) => s.isTyping[id]);

    const messages = chats[id] || [];
    const [input, setInput] = useState("");
    const [rules, setRules] = useState("");

    useEffect(() => {
        if (id && trainingRules[id]) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRules(trainingRules[id]);
        }
    }, [id, trainingRules]);

    if (!assistant) {
        return (
            <section className="p-6 text-white">
                <p>Asistente no encontrado 😕</p>
            </section>
        );
    }

    const handleSave = async () => {
        await saveTraining(assistant.id, rules);

        toast.success({
            text: "Entrenamiento guardado con éxito.",
            description: "Las instrucciones fueron almacenadas correctamente.",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        // mensaje del usuario
        addUserMessage(id, input);
        setInput('');

        // respuesta simulada del asistente
        await addAssistantMessage(id);
    };

    return (
        <section className="flex flex-col xl:min-h-[93dvh] p-5 sm:p-8 space-y-5">
            {/* Header */}
            <header className="max-w-7xl mx-auto w-full">
                <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-black text-balance leading-tight text-white">
                    Entrenar Asistente
                </h1>
                <p className="text-sm md:text-base xl:text-lg text-neutral-400 text-pretty leading-relaxed">
                    {assistant.name} · {assistant.language} · {assistant.tone}
                </p>
                <p className="text-xs md:text-sm xl:text-base text-neutral-600 text-pretty leading-relaxed">
                    {assistant.description}
                </p>
            </header>

            <aside className="flex flex-col lg:flex-row items-start justify-center gap-5 max-w-7xl mx-auto w-full">
                {/* Training */}
                <article className="border border-neutral-800 rounded-xl p-5 px-7 space-y-4 w-full">
                    <h2 className="text-xl font-bold text-white">
                        Reglas / Instrucciones
                    </h2>

                    <textarea
                        value={rules}
                        onChange={(e) => setRules(e.target.value)}
                        placeholder="Ej: Responde siempre en tono profesional..."
                        className="w-full rounded-xl border bg-neutral-950 border-neutral-800 px-3 py-2 text-white placeholder:text-neutral-400 hover:border-neutral-600 duration-200 focus:outline-none focus:border-primary transition-colors resize-none h-30 text-xs md:text-sm"
                    />

                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={isSavingTraining}
                            className={`flex items-center gap-2 text-white transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center
                            ${isSavingTraining
                                    ? "bg-primary/30 cursor-not-allowed"
                                    : "bg-primary hover:bg-primary/40 cursor-pointer"
                                } text-white`}
                        >
                            {isSavingTraining ? (
                                <p className="flex items-center justify-center gap-2">
                                    Guardando...
                                    <LoaderPinwheelIcon className="size-4 md:size-5 animate-spin" />
                                </p>
                            ) : (
                                <p className="flex items-center justify-center gap-2">
                                    Guardar Entrenamiento
                                    <CheckIcon className="size-4 md:size-5" />
                                </p>
                            )}
                        </button>
                    </div>
                </article>

                <article className="border border-neutral-800 rounded-xl p-5 px-7 space-y-4 w-full">
                    <header className="flex flex-col md:flex-row justify-between items-center gap-2">
                        <h2 className="text-xl font-bold text-white">
                            Chat Simulado
                        </h2>
                        <button
                            onClick={() => resetChat(id)}
                            className="flex items-center gap-1 text-sm text-neutral-400 hover:text-primary transition cursor-pointer"
                        >
                            <RotateCcwIcon className="size-4" />
                            Reiniciar conversación
                        </button>
                    </header>

                    <div className="min-h-55 max-h-80 overflow-y-auto space-y-3 bg-neutral-950 border border-neutral-800 rounded-xl p-4">
                        {messages.length === 0 && (
                            <p className="text-neutral-500 text-sm">
                                Inicia la conversación 👋
                            </p>
                        )}

                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`max-w-[75%] px-4 py-2 rounded-xl text-sm
                                    ${msg.role === "user"
                                        ? "bg-primary text-white ml-auto"
                                        : "bg-neutral-800 text-neutral-200"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}
                    </div>

                    {isTyping && (
                        <div className="bg-neutral-800 text-neutral-300 text-sm px-4 py-2 rounded-lg w-fit animate-pulse">
                            El asistente está escribiendo...
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center gap-3"
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-400 hover:border-neutral-600 duration-200 focus:outline-none focus:border-primary text-xs md:text-sm transition-colors"
                        />

                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-primary text-white hover:bg-primary/40 transition duration-200 p-2 rounded-full font-semibold text-xs xl:text-sm justify-center cursor-pointer"
                        >
                            <SendHorizontalIcon className="size-4 md:size-5" />
                        </button>
                    </form>
                </article>
            </aside>
        </section>
    );
}
