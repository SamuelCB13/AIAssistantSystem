import { CircleAlertIcon, MoveRightIcon, XIcon } from "lucide-react";
import { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function AssistantModal({ open, onClose }: Props) {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('');
    const [tone, setTone] = useState('');
    const [description, setDescription] = useState('');

    const isStepOneValid =
        name.trim() !== '' &&
        language !== '' &&
        tone !== '' &&
        description !== '';

    if (!open) return null;

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center p-5">
            {/* Overlay */}
            <article
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <article className="relative z-10 w-full max-w-4xl bg-dark border border-neutral-800 rounded-xl p-5 px-7 animate-fadeOut space-y-5">
                <header>
                    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-black text-balance leading-tight text-white">
                        Crear Asistente
                    </h2>

                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3 my-4">
                        <p className="text-sm md:text-base xl:text-lg text-neutral-400 text-pretty leading-relaxed">
                            Paso 1: Datos básicos
                        </p>

                        <p className="block text-sm text-neutral-600 italic">
                            Los campos marcados con  <span className="text-primary font-bold">*</span> son obligatorios.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
                    <div className="col-span-3 md:col-span-1 space-y-2">
                        <label className="block text-sm ml-1 text-neutral-500">
                            Nombre del asistente <span className="text-primary font-bold">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Asistente de Ventas"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-all duration-200 hover:border-neutral-500"
                        />
                        {name.length < 3 && (
                            <p className="block text-sm mb-2 ml-1 text-primary">
                                Mínimo 3 caracteres.
                            </p>
                        )}
                    </div>
                    <div className="col-span-3 md:col-span-1">
                        <label className="block text-sm mb-2 ml-1 text-neutral-500">
                            Idioma <span className="text-primary font-bold">*</span>
                        </label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-all duration-200 cursor-pointer hover:border-neutral-500"
                        >
                            <option value="" disabled className="bg-neutral-900 text-neutral-500">
                                Selecciona un idioma
                            </option>
                            <option value="Español" className="bg-neutral-900 text-white py-2 hover:bg-primary/20">
                                Español
                            </option>
                            <option value="Inglés" className="bg-neutral-900 text-white py-2 hover:bg-primary/20">
                                Inglés
                            </option>
                            <option value="Portugués" className="bg-neutral-900 text-white py-2 hover:bg-primary/20">
                                Portugués
                            </option>
                        </select>
                    </div>
                    <div className="col-span-3 md:col-span-1">
                        <label className="block text-sm mb-2 ml-1 text-neutral-500">
                            Tono <span className="text-primary font-bold">*</span>
                        </label>
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-all duration-200 cursor-pointer hover:border-neutral-500"
                        >
                            <option value="" disabled className="bg-neutral-900 text-neutral-500">
                                Selecciona un tono
                            </option>
                            <option value="Formal" className="bg-neutral-900 text-white py-2 hover:bg-primary/20">
                                Formal
                            </option>
                            <option value="Casual" className="bg-neutral-900 text-white py-2 hover:bg-primary/20">
                                Casual
                            </option>
                            <option value="Profesional" className="bg-neutral-900 text-white py-2 hover:bg-primary/20">
                                Profesional
                            </option>
                            <option value="Amigable" className="bg-neutral-900 text-white py-2 hover:bg-primary/20">
                                Amigable
                            </option>
                        </select>
                    </div>
                    <div className="w-full col-span-3">
                        <label className="block text-sm mb-2 ml-1 text-neutral-500">
                            Descripción <span className="text-primary font-bold">*</span>
                        </label>
                        <textarea
                            placeholder="Describe brevemente el propósito y las funciones de tu asistente."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-all duration-200 cursor-pointer hover:border-neutral-500 resize-none h-24"></textarea>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <button onClick={onClose} className="flex items-center gap-2 text-white bg-black hover:bg-neutral-800 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center border border-neutral-800 cursor-pointer">
                        <XIcon className="size-4 md:size-5" />
                        Cancelar
                    </button>

                    {!isStepOneValid && (
                        <p className="flex items-center justify-center gap-1 text-sm text-primary">
                            <CircleAlertIcon className="size-5" />
                            Completa todos los campos para continuar.
                        </p>
                    )}

                    <button
                        onClick={() => console.log({ name, language, tone, description })}
                        disabled={!isStepOneValid}
                        className={`flex items-center gap-2 text-white transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center ${isStepOneValid ? 'bg-primary hover:bg-primary/40 cursor-pointer' : 'bg-primary/30 cursor-not-allowed'}`}>
                        Siguiente
                        <MoveRightIcon className="size-4 md:size-5" />
                    </button>
                </div>
            </article>
        </section>
    );
}
