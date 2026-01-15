type Props = {
    short: number;
    medium: number;
    long: number;
    audioEnabled: boolean;

    onShortChange: (v: number) => void;
    onMediumChange: (v: number) => void;
    onLongChange: (v: number) => void;
    onAudioChange: (v: boolean) => void;
};

export default function StepTwo({
    short,
    medium,
    long,
    audioEnabled,
    onShortChange,
    onMediumChange,
    onLongChange,
    onAudioChange,
}: Props) {
    return (
        <article className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center gap-5">
            <div className="col-span-4 md:col-span-1 space-y-2">
                <label className="block text-xs md:text-sm ml-1 text-neutral-500">
                    Respuestas Cortas <span className="text-primary font-bold">*</span>
                </label>
                <input
                    type="number"
                    min={0}
                    value={short}
                    onChange={(e) => onShortChange(+e.target.value)}
                    className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-colors duration-200 hover:border-neutral-500 text-xs md:text-sm"
                />
            </div>
            <div className="col-span-4 md:col-span-1 space-y-2">
                <label className="block text-xs md:text-sm ml-1 text-neutral-500">
                    Respuestas Medias <span className="text-primary font-bold">*</span>
                </label>
                <input
                    type="number"
                    min={0}
                    value={medium}
                    onChange={(e) => onMediumChange(+e.target.value)}
                    className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-colors duration-200 hover:border-neutral-500 text-xs md:text-sm"
                />
            </div>
            <div className="col-span-4 md:col-span-1 space-y-2">
                <label className="block text-xs md:text-sm ml-1 text-neutral-500">
                    Respuestas Largas <span className="text-primary font-bold">*</span>
                </label>
                <input
                    type="number"
                    min={0}
                    value={long}
                    onChange={(e) => onLongChange(+e.target.value)}
                    className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-white focus:border-primary focus:outline-none transition-colors duration-200 hover:border-neutral-500 text-xs md:text-sm"
                />
            </div>
            <label className="flex items-center justify-center gap-2 text-neutral-500">
                <input
                    type="checkbox"
                    checked={audioEnabled}
                    onChange={(e) => onAudioChange(e.target.checked)}
                    className="accent-primary"
                />
                Respuestas de Audio
            </label>
        </article>
    );
}
