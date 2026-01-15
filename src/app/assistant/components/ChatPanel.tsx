import { MessageCirclePlusIcon, RotateCcwIcon, SendHorizontalIcon } from "lucide-react";
import { ChatMessage } from "@/store/assistantStore";
import { useEffect, useRef } from "react";

type Props = {
    messages: ChatMessage[];
    input: string;
    onInputChange: (v: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onReset: () => void;
    isTyping: boolean;
};

export function ChatPanel({
    messages,
    input,
    onInputChange,
    onSubmit,
    onReset,
    isTyping,
}: Props) {
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const prevLengthRef = useRef(0);

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];

        // solo scrollear cuando el usuario envía un mensaje
        if (
            messages.length > prevLengthRef.current &&
            lastMessage?.role === "user"
        ) {
            bottomRef.current?.scrollIntoView({
                behavior: "smooth",
            });
        }

        prevLengthRef.current = messages.length;
    }, [messages]);

    return (
        <article className="border border-neutral-800 rounded-xl p-5 px-7 space-y-4 w-full">
            <header className="flex flex-col md:flex-row gap-2 justify-between items-center">
                <h2 className="text-xl font-bold text-white">
                    Chat Simulado
                </h2>

                <button
                    onClick={onReset}
                    className="flex items-center gap-1 text-sm text-neutral-400 hover:text-primary cursor-pointer transition-colors duration-200"
                >
                    <RotateCcwIcon className="size-4" />
                    Reiniciar Conversación
                </button>
            </header>

            <div className="min-h-80 max-h-80 overflow-y-auto space-y-3 bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                {messages.length === 0 && (
                    <p className="text-neutral-500 text-sm">
                        Inicia la conversación 👋
                    </p>
                )}

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`max-w-[75%] px-5 py-2 rounded-xl text-xs md:text-sm
                            ${msg.role === "user"
                                ? "bg-primary text-white ml-auto"
                                : "bg-neutral-800 text-neutral-200"
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {isTyping && (
                <div className="flex items-center gap-1 bg-neutral-800 text-neutral-300 text-sm px-5 py-2 rounded-lg w-fit animate-pulse">
                    <MessageCirclePlusIcon className="size-3 md:size-4" />
                    El asistente está escribiendo...
                </div>
            )}

            <form onSubmit={onSubmit} className="flex items-center gap-3">
                <input
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="w-full px-5 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-white placeholder:text-neutral-400 hover:border-neutral-600 focus:outline-none focus:border-primary text-xs md:text-sm transition-colors duration-200"
                />

                <button
                    type="submit"
                    className="flex items-center gap-2 text-white bg-primary hover:bg-primary/40 transition duration-200 p-2 rounded-full font-semibold justify-center cursor-pointer"
                >
                    <SendHorizontalIcon className="size-4 text-white" />
                </button>
            </form>
        </article>
    );
}
