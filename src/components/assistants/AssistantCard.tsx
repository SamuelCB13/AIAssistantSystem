import { Assistant } from '@/types/assistant';

type Props = {
    assistant: Assistant;
    onOpenModal: () => void;
};

import { useAssistantStore } from "@/store/assistantStore";
import { BotIcon, BrainCircuitIcon, EditIcon, LanguagesIcon, MicVocalIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export default function AssistantCard({ assistant, onOpenModal }: Props) {
    const setAssistantToEdit = useAssistantStore((s) => s.setAssistantToEdit);
    const setAssistantToDelete = useAssistantStore((s) => s.setAssistantToDelete);

    return (
        <section className="bg-primary/5 border border-primary/20 rounded-xl p-5 space-y-6 hover:bg-primary/10 hover:border-primary/40 transition-colors duration-200">
            <header className="flex items-center gap-2 md:gap-3">
                <div className="p-2 bg-primary/30 rounded-full">
                    <BotIcon className="text-primary size-4 md:size-5" />
                </div>
                <h2 className="text-white font-bold text-lg md:text-xl">{assistant.name}</h2>
            </header>
            <article className="text-sm xl:text-base text-neutral-400 text-pretty leading-relaxed">
                {assistant.description}
            </article>
            <article className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm text-neutral-500">
                    <LanguagesIcon className="size-4" />
                    {assistant.language}
                </p>
                <p className="flex items-center gap-2 text-sm text-neutral-500">
                    <MicVocalIcon className="size-4" />
                    {assistant.tone}
                </p>
            </article>
            <hr className="text-neutral-800 rounded-full" />
            <footer className="flex items-center gap-4 md:gap-5">
                <Link href="/dashboard" className="flex items-center gap-2 bg-primary text-white hover:bg-primary/40 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm w-full justify-center">
                    <BrainCircuitIcon className="size-4 md:size-5" />
                    Entrenar
                </Link>
                <button
                    onClick={() => {
                        setAssistantToEdit(assistant);
                        onOpenModal();
                    }}
                    className="flex items-center gap-2 text-white bg-black hover:bg-neutral-800 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm w-full justify-center border border-neutral-800 cursor-pointer">
                    <EditIcon className="size-4 md:size-5" />
                    Editar
                </button>
                <button
                    onClick={() => setAssistantToDelete(assistant)}
                    className="flex  items-center justify-center text-red bg-delete hover:bg-red-950 transition duration-200 px-5 py-2 rounded-lg w-1/5 md:w-auto border border-red-950 cursor-pointer">
                    <Trash2Icon className="size-4 md:size-5" />
                </button>
            </footer>
        </section>
    )
}
