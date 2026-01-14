"use client";

const assistants = [
    {
        id: '1',
        name: 'Asistente de Ventas',
        description: 'Ayuda a responder preguntas frecuentes de clientes. No sé qué más poner aquí, solo hago esto para que el texto se vea más largo y ocupe espacio.',
        language: 'Español',
        tone: 'Profesional',
    },
    {
        id: '2',
        name: 'Soporte Técnico',
        description: 'Ayuda a responder preguntas frecuentes de clientes. No sé qué más poner aquí, solo hago esto para que el texto se vea más largo y ocupe espacio.',
        language: 'Inglés',
        tone: 'Amigable',
    },
    {
        id: '3',
        name: 'Assistant IA',
        description: 'Ayuda a responder preguntas frecuentes de clientes. No sé qué más poner aquí, solo hago esto para que el texto se vea más largo y ocupe espacio.',
        language: 'Francés',
        tone: 'Casual',
    },
];

import { useEffect, useState } from "react";
import { toast } from "@pheralb/toast";
import { PlusIcon, SearchIcon } from "lucide-react";
import { AssistantList } from "@/components/assistants/AssistantList";
import { AssistantListSkeleton } from '@/components/assistants/AssistantListSkeleton';
import { AssistantModal } from "@/components/modal/AssistantModal";

export default function Home() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // 1.5 segundos

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        toast.default({
            text: "¡Bienvenidxs a AI Assistant!",
            description: "Tu plataforma para crear asistentes de IA personalizados. 🤖",
            icon: "🎉",
        });
    }, []);

    return (
        <section className="flex flex-col xl:min-h-[93dvh] p-5 sm:p-8 animate-fadeIn space-y-5">
            <article className="max-w-7xl mx-auto w-full">
                <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-black text-balance leading-tight text-white">
                    Asistentes de IA
                </h1>

                <p className="text-sm md:text-base xl:text-lg text-neutral-400 text-pretty leading-relaxed">
                    Crea, entrena y gestiona tus asistentes personalizados.
                </p>
            </article>

            <article className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-5">
                {/* Buscador */}
                <div className="relative w-full md:w-2/4">
                    <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 size-4" />
                    <input
                        type="text"
                        placeholder="Buscar asistentes por nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-10 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-400 hover:border-neutral-600 duration-200 focus:outline-none focus:border-primary"
                    />
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-white hover:bg-primary/40 transition duration-200 px-4 py-3 rounded-lg font-semibold text-sm xl:text-base w-full md:w-auto justify-center cursor-pointer">
                    <PlusIcon className="size-4 md:size-5" />
                    Crear Asistente
                </button>
            </article>

            <div className="max-w-7xl mx-auto w-full">
                {loading ? (
                    <AssistantListSkeleton />
                ) : (
                    <AssistantList assistants={assistants} search={search} />
                )}
            </div>

            <AssistantModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </section>
    );
}
