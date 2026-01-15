import { CheckIcon, CircleAlertIcon, MoveLeftIcon, MoveRightIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { toast } from "@pheralb/toast";
import { useAssistantStore } from '@/store/assistantStore';
import { INITIAL_ASSISTANT_FORM } from "@/constants/assistantForm";
import { AssistantForm } from "@/types/assistant";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function AssistantModal({ open, onClose }: Props) {
    const [form, setForm] = useState<AssistantForm>(INITIAL_ASSISTANT_FORM);
    const [step, setStep] = useState(1);

    const { name, language, tone, description, responseLength } = form;
    const { short, medium, long } = responseLength;
    const total = short + medium + long;

    const isStepOneValid =
        name.trim() !== '' &&
        name.length >= 3 &&
        language !== '' &&
        tone !== '' &&
        description !== '';

    const isStepTwoValid =
        total === 100 && short > 0 && medium > 0 && long > 0;

    const assistantToEdit = useAssistantStore((s) => s.assistantToEdit);
    const setAssistantToEdit = useAssistantStore((s) => s.setAssistantToEdit);
    const updateAssistant = useAssistantStore((s) => s.updateAssistant);
    const addAssistant = useAssistantStore((s) => s.addAssistant);

    const isEditMode = Boolean(assistantToEdit);

    useEffect(() => {
        if (assistantToEdit) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm(assistantToEdit);
            setStep(1);
        } else {
            setForm(INITIAL_ASSISTANT_FORM);
        }
    }, [assistantToEdit]);

    const handleClose = () => {
        setAssistantToEdit(null);
        setForm(INITIAL_ASSISTANT_FORM);
        setStep(1);
        onClose();
    };

    const updateField = <K extends keyof AssistantForm>(
        field: K,
        value: AssistantForm[K]
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateResponseLength = (
        field: keyof AssistantForm['responseLength'],
        value: number
    ) => {
        setForm((prev) => ({
            ...prev,
            responseLength: {
                ...prev.responseLength,
                [field]: value,
            },
        }));
    };

    const handleSave = () => {
        if (!isStepTwoValid) {
            toast.error({
                text: "Ha ocurrido un error.",
                description: "La suma de respuestas debe ser 100 y ningún campo puede ser 0.",
            });
            return;
        }

        if (isEditMode && assistantToEdit) {
            updateAssistant({
                ...form,
                id: assistantToEdit.id,
            });

            toast.success({
                text: "Asistente editado con éxito.",
            });
        } else {
            addAssistant({
                ...form,
            });

            toast.success({
                text: "Asistente creado con éxito.",
            });
        }

        handleClose();
        setForm(INITIAL_ASSISTANT_FORM);
    };

    if (!open) return null;

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center p-5">
            {/* Overlay */}
            <article
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <article className="relative z-10 w-full max-w-4xl bg-dark border border-neutral-800 rounded-xl p-5 px-7 animate-fadeOut space-y-5 max-h-[90dvh] overflow-y-auto">
                <header className="space-y-3">
                    <div className="flex flex-col md:flex-row text-center items-center justify-between gap-2">
                        <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-black text-balance leading-tight text-white">
                            {isEditMode ? 'Editar Asistente' : 'Crear Asistente'}
                        </h2>
                        <p className="block text-xs md:text-sm text-neutral-600 italic">
                            Los campos marcados con  <span className="text-primary font-bold">*</span> son obligatorios.
                        </p>
                    </div>

                    {step === 1 ? (
                        <p className="text-sm md:text-base text-neutral-400 text-pretty leading-relaxed">
                            Paso 1: Datos básicos
                        </p>
                    ) : (
                        <p className="text-sm md:text-base text-neutral-400 text-pretty leading-relaxed">
                            Paso 2: Configuración de Respuestas
                        </p>
                    )}

                    <div className="flex items-center justify-center gap-5 w-full border-b border-neutral-800 pb-3 my-4">
                        {/* Paso 1 */}
                        <div className="flex items-center">
                            <div
                                className={`flex items-center justify-center size-7 rounded-full border text-xs font-bold transition ${step >= 1
                                    ? "bg-primary border-primary text-white"
                                    : "border-neutral-700 text-neutral-500"
                                    }`}
                            >
                                1
                            </div>
                            <span
                                className={`ml-2 text-xs md:text-sm ${step >= 1 ? "text-primary" : "text-neutral-500"}`}
                            >
                                Datos básicos
                            </span>
                        </div>

                        {/* Línea */}
                        <div
                            className={`hidden md:flex mx-4 h-0.5 w-12 md:w-20 transition ${step === 2 ? "bg-primary" : "bg-neutral-800"}`}
                        />

                        {/* Paso 2 */}
                        <div className="flex items-center">
                            <div
                                className={`flex items-center justify-center size-7 rounded-full border text-xs font-bold transition ${step === 2
                                    ? "bg-primary border-primary text-white"
                                    : "border-neutral-700 text-neutral-500"
                                    }`}
                            >
                                2
                            </div>
                            <span
                                className={`ml-2 text-xs md:text-sm ${step === 2 ? "text-primary" : "text-neutral-500"}`}
                            >
                                Configuración
                            </span>
                        </div>
                    </div>
                </header>

                {step === 1 && (
                    <StepOne
                        name={form.name}
                        language={form.language}
                        tone={form.tone}
                        description={form.description}
                        onNameChange={(v) => updateField('name', v)}
                        onLanguageChange={(v) => updateField('language', v)}
                        onToneChange={(v) => updateField('tone', v)}
                        onDescriptionChange={(v) => updateField('description', v)}
                    />
                )}

                {step === 2 && (
                    <StepTwo
                        short={form.responseLength.short}
                        medium={form.responseLength.medium}
                        long={form.responseLength.long}
                        audioEnabled={form.audioEnabled}
                        onShortChange={(v) => updateResponseLength('short', v)}
                        onMediumChange={(v) => updateResponseLength('medium', v)}
                        onLongChange={(v) => updateResponseLength('long', v)}
                        onAudioChange={(v) => updateField('audioEnabled', v)}
                    />
                )}

                {step === 1 && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                        <button onClick={handleClose} className="flex items-center gap-2 text-white bg-black hover:bg-neutral-800 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center border border-neutral-800 cursor-pointer">
                            <XIcon className="size-4 md:size-5" />
                            Cancelar
                        </button>

                        {!isStepOneValid && (
                            <p className="flex items-center justify-center gap-2 text-xs md:text-sm text-secondary">
                                <CircleAlertIcon className="size-3 md:size-4" />
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
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                        <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-2 text-white bg-black hover:bg-neutral-800 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center border border-neutral-800 cursor-pointer"
                        >
                            <MoveLeftIcon className="size-4 md:size-5" />
                            Atrás
                        </button>

                        {total !== 100 && (
                            <p className="flex items-center justify-center gap-2 text-xs md:text-sm text-secondary">
                                <CircleAlertIcon className="size-3 md:size-4" />
                                La suma de respuestas debe ser 100. Actualmente es {total}.
                            </p>
                        )}

                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 text-white bg-primary hover:bg-primary/40 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center cursor-pointer"
                        >
                            {isEditMode ? 'Guardar Cambios' : 'Guardar Asistente'}
                            <CheckIcon className="size-4 md:size-5" />
                        </button>
                    </div>
                )}
            </article>
        </section>
    );
}
