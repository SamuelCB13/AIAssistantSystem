type Props = {
    name: string;
    language: string;
    tone: string;
    description: string;

    onNameChange: (v: string) => void;
    onLanguageChange: (v: string) => void;
    onToneChange: (v: string) => void;
    onDescriptionChange: (v: string) => void;
};

export default function StepOne({
    name,
    language,
    tone,
    description,
    onNameChange,
    onLanguageChange,
    onToneChange,
    onDescriptionChange,
}: Props) {
    return (
        <article className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
            <div className="col-span-3 md:col-span-1 space-y-2">
                <label className="block text-xs md:text-sm ml-1 text-neutral-500">
                    Nombre del asistente <span className="text-primary font-bold">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Ej: Asistente de Ventas"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-colors duration-200 hover:border-neutral-500 text-xs md:text-sm"
                />
                {name.length < 3 && (
                    <p className="block text-xs md:text-sm mb-2 ml-1 text-primary">
                        Mínimo 3 caracteres.
                    </p>
                )}
            </div>
            <div className="col-span-3 md:col-span-1">
                <label className="block text-xs md:text-sm mb-2 ml-1 text-neutral-500">
                    Idioma <span className="text-primary font-bold">*</span>
                </label>
                <select
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-alcolorsl duration-200 cursor-pointer hover:border-neutral-500 text-xs md:text-sm"
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
                <label className="block text-xs md:text-sm mb-2 ml-1 text-neutral-500">
                    Tono <span className="text-primary font-bold">*</span>
                </label>
                <select
                    value={tone}
                    onChange={(e) => onToneChange(e.target.value)}
                    className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-colors duration-200 cursor-pointer hover:border-neutral-500 text-xs md:text-sm"
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
                <label className="block text-xs md:text-sm mb-2 ml-1 text-neutral-500">
                    Descripción <span className="text-primary font-bold">*</span>
                </label>
                <textarea
                    placeholder="Describe brevemente el propósito y las funciones de tu asistente."
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-colors duration-200 hover:border-neutral-500 resize-none h-20 md:h-24 text-xs md:text-sm"></textarea>
            </div>
        </article>
    )
}
