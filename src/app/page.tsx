"use client";

import { useEffect, useState } from "react";
import { toast } from "@pheralb/toast";
import { PlusIcon, SearchIcon } from "lucide-react";
import { AssistantList } from "@/components/assistants/AssistantList";
import { AssistantListSkeleton } from '@/components/assistants/AssistantListSkeleton';
import { AssistantModal } from "@/components/modal/AssistantModal";
import { useAssistantStore } from "@/store/assistantStore";
import { ConfirmModal } from "@/components/modal/ConfirmModal";

export default function Home() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const setAssistantToEdit = useAssistantStore((s) => s.setAssistantToEdit);
    const assistantToDelete = useAssistantStore((s) => s.assistantToDelete);
    const setAssistantToDelete = useAssistantStore((s) => s.setAssistantToDelete);
    const deleteAssistant = useAssistantStore((s) => s.deleteAssistant);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // 1.5 segundos

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="flex flex-col p-5 sm:p-8 space-y-5">
            <header className="max-w-7xl mx-auto w-full">
                <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-black text-balance leading-tight text-white">
                    Asistentes de IA
                </h1>

                <p className="text-sm md:text-base xl:text-lg text-neutral-400 text-pretty leading-relaxed">
                    Crea, entrena y gestiona tus asistentes personalizados.
                </p>
            </header>

            <article className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-5 animate-fadeIn">
                {/* Buscador */}
                <div className="relative w-full md:w-2/4">
                    <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 size-4" />
                    <input
                        type="text"
                        placeholder="Buscar asistentes por nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-10 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-400 hover:border-neutral-600 duration-200 focus:outline-none focus:border-primary"
                    />
                </div>
                <button
                    onClick={() => {
                        setAssistantToEdit(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-primary text-white hover:bg-primary/40 transition duration-200 px-5 py-2 rounded-lg font-semibold text-sm xl:text-base w-full md:w-auto justify-center cursor-pointer">
                    <PlusIcon className="size-4 md:size-5" />
                    Crear Asistente
                </button>
            </article>

            <div className="max-w-7xl mx-auto w-full animate-fadeIn">
                {loading ? (
                    <AssistantListSkeleton />
                ) : (
                    <AssistantList search={search} onOpenModal={() => setIsModalOpen(true)} />
                )}
            </div>

            <AssistantModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <ConfirmModal
                open={Boolean(assistantToDelete)}
                title="Eliminar Asistente"
                description="Esta acción no se puede deshacer. ¿Deseas continuar?"
                onCancel={() => setAssistantToDelete(null)}
                onConfirm={() => {
                    if (!assistantToDelete) return;

                    deleteAssistant(assistantToDelete.id);

                    toast.success({
                        text: 'Asistente eliminado con éxito.',
                    });
                }}
            />
        </section>
    );
}
