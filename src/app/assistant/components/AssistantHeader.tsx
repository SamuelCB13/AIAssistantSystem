import { Assistant } from "@/types/assistant";

type Props = {
    assistant: Assistant;
};

export function AssistantHeader({ assistant }: Props) {
    return (
        <header className="max-w-7xl mx-auto w-full space-y-2">
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-black text-white">
                Entrenar Asistente
            </h1>

            <p className="text-sm md:text-base xl:text-lg text-neutral-400">
                {assistant.name} · {assistant.language} · {assistant.tone} · {assistant.audioEnabled ? "Respuestas con audio" : "Respuestas sin audio"}
            </p>

            <p className="text-xs md:text-sm xl:text-base text-neutral-600">
                {assistant.description}
            </p>
        </header>
    );
}
