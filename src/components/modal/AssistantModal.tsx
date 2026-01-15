import { CheckIcon, CircleAlertIcon, MoveLeftIcon, MoveRightIcon, XIcon } from "lucide-react";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { toast } from "@pheralb/toast";
import { useAssistantStore } from '@/store/assistantStore';

type Props = {
    open: boolean;
    onClose: () => void;
};

export function AssistantModal({ open, onClose }: Props) {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('');
    const [tone, setTone] = useState('');
    const [description, setDescription] = useState('');
    const [step, setStep] = useState(1);
    const [short, setShort] = useState(0);
    const [medium, setMedium] = useState(0);
    const [long, setLong] = useState(0);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const total = short + medium + long;
    const isStepTwoValid = total === 100;

    const addAssistant = useAssistantStore((state) => state.addAssistant);

    const isStepOneValid =
        name.trim() !== '' &&
        language !== '' &&
        tone !== '' &&
        description !== '';

    const resetForm = () => {
        setName('');
        setLanguage('');
        setTone('');
        setDescription('');
        setShort(0);
        setMedium(0);
        setLong(0);
        setAudioEnabled(false);
        setStep(1);
    };

    const handleSave = () => {
        if (!isStepTwoValid || short === 0 || medium === 0 || long === 0) {
            toast.error({
                text: "Ha ocurrido un error.",
                description: "La suma de respuestas debe ser 100 y ningún campo puede ser 0.",
            });
            return;
        }

        const newAssistant = {
            id: crypto.randomUUID(),
            name,
            language,
            tone,
            description,
            responseLength: {
                short,
                medium,
                long,
            },
            audioEnabled,
        };

        addAssistant(newAssistant);

        toast.success({
            text: "Asistente creado con éxito.",
            description: "Puedes verlo en la lista de asistentes.",
        });

        onClose();
        resetForm();
    };

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
                        {step === 1 ? (
                            <p className="text-sm md:text-base xl:text-lg text-neutral-400 text-pretty leading-relaxed">
                                Paso 1: Datos básicos
                            </p>
                        ) : (
                            <p className="text-sm md:text-base xl:text-lg text-neutral-400 text-pretty leading-relaxed">
                                Paso 2: Configuración de Respuestas
                            </p>
                        )}

                        <p className="block text-sm text-neutral-600 italic">
                            Los campos marcados con  <span className="text-primary font-bold">*</span> son obligatorios.
                        </p>
                    </div>
                </header>

                {step === 1 && (
                    <StepOne
                        name={name}
                        language={language}
                        tone={tone}
                        description={description}
                        onNameChange={setName}
                        onLanguageChange={setLanguage}
                        onToneChange={setTone}
                        onDescriptionChange={setDescription}
                    />
                )}

                {step === 2 && (
                    <StepTwo
                        short={short}
                        medium={medium}
                        long={long}
                        audioEnabled={audioEnabled}
                        onShortChange={setShort}
                        onMediumChange={setMedium}
                        onLongChange={setLong}
                        onAudioChange={setAudioEnabled}
                    />
                )}

                {step === 1 && (
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
                            onClick={() => setStep(2)}
                            disabled={!isStepOneValid}
                            className={`flex items-center gap-2 text-white transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center ${isStepOneValid ? 'bg-primary hover:bg-primary/40 cursor-pointer' : 'bg-primary/30 cursor-not-allowed'}`}>
                            Siguiente
                            <MoveRightIcon className="size-4 md:size-5" />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-2 text-white bg-black hover:bg-neutral-800 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center border border-neutral-800 cursor-pointer"
                        >
                            <MoveLeftIcon className="size-4 md:size-5" />
                            Atrás
                        </button>

                        {total !== 100 && (
                            <p className="flex items-center justify-center gap-1 text-sm text-secondary">
                                <CircleAlertIcon className="size-5" />
                                La suma de respuestas debe ser 100. Actualmente es {total}.
                            </p>
                        )}

                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 text-white bg-primary hover:bg-primary/40 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center cursor-pointer"
                        >
                            Guardar Asistente
                            <CheckIcon className="size-4 md:size-5" />
                        </button>
                    </div>
                )}
            </article>

            <div style={{ marginTop: 20 }}>
                {step === 2 && (
                    <button onClick={() => setStep(1)}>
                        Atrás
                    </button>
                )}

                {step === 1 && (
                    <button onClick={() => setStep(2)}>
                        Siguiente
                    </button>
                )}

                {step === 2 && (
                    <button
                        disabled={!isStepTwoValid}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm ${isStepTwoValid
                            ? 'bg-primary hover:bg-primary/40 text-white'
                            : 'bg-primary/30 text-white cursor-not-allowed'
                            }
                        `}
                    >
                        Guardar
                    </button>
                )}
            </div>

        </section>
    );
}
