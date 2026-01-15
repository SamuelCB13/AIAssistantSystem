import { CheckIcon, LoaderPinwheelIcon } from "lucide-react";

type Props = {
    rules: string;
    onChange: (value: string) => void;
    onSave: () => void;
    isSaving: boolean;
};

export function TrainingPanel({
    rules,
    onChange,
    onSave,
    isSaving,
}: Props) {
    return (
        <article className="border border-neutral-800 rounded-xl p-5 px-7 space-y-4 w-full">
            <h2 className="text-xl font-bold text-white">
                Reglas / Instrucciones
            </h2>

            <textarea
                value={rules}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Ej: Responde siempre en tono profesional..."
                className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-colors duration-200 hover:border-neutral-500 resize-none h-30 text-xs md:text-sm"
            />

            <div className="flex justify-end">
                <button
                    onClick={onSave}
                    disabled={isSaving}
                    className={`flex items-center gap-2 text-white transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center
                        ${isSaving
                            ? "bg-primary/30 cursor-not-allowed"
                            : "bg-primary hover:bg-primary/40 cursor-pointer"
                        }`}
                >
                    {isSaving ? (
                        <>
                            Guardando...
                            <LoaderPinwheelIcon className="size-4 animate-spin" />
                        </>
                    ) : (
                        <>
                            Guardar Entrenamiento
                            <CheckIcon className="size-4" />
                        </>
                    )}
                </button>
            </div>
        </article>
    );
}
