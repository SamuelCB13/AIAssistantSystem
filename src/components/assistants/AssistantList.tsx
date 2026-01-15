import { XIcon } from 'lucide-react';
import AssistantCard from './AssistantCard';
import { useAssistantStore } from '@/store/assistantStore';

type Props = {
    search: string;
    onOpenModal: () => void;
};

export function AssistantList({ search, onOpenModal }: Props) {
    const assistants = useAssistantStore((state) => state.assistants);

    const filteredAssistants = assistants.filter((assistant) =>
        assistant.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredAssistants.length === 0) {
        return (
            <div className="flex items-center justify-center gap-1 text-secondary py-10">
                <XIcon className="size-5" />
                No se encontraron asistentes...
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredAssistants.map((assistant) => (
                <AssistantCard
                    key={assistant.id}
                    assistant={assistant}
                    onOpenModal={onOpenModal}
                />
            ))}
        </div>
    );
}
