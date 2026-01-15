import { XIcon, Trash2Icon } from 'lucide-react';

type Props = {
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmModal({
    open,
    title,
    description,
    onConfirm,
    onCancel,
}: Props) {
    if (!open) return null;

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center p-5 animate-fadeOut">
            <article
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onCancel}
            />

            <article className="relative z-10 w-full max-w-md bg-dark border border-neutral-800 rounded-xl p-6 space-y-5">
                <header className="space-y-2">
                    <h2 className="text-xl font-black text-white">{title}</h2>
                    <p className="text-sm text-neutral-400">{description}</p>
                </header>

                <div className="flex items-center justify-between gap-3">
                    <button
                        onClick={onCancel}
                        className="flex items-center gap-2 text-white bg-black hover:bg-neutral-800 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center border border-neutral-800 cursor-pointer"
                    >
                        <XIcon className="size-4 md:size-5" />
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex items-center gap-2 text-white bg-primary hover:bg-primary/40 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center cursor-pointer"
                    >
                        <Trash2Icon className="size-4 md:size-5" />
                        Eliminar
                    </button>
                </div>
            </article>
        </section>
    );
}
