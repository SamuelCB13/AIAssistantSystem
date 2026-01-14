import { XIcon } from 'lucide-react';
import AssistantCard from './AssistantCard';

type Assistant = {
    id: string;
    name: string;
    description: string;
    language: string;
    tone: string;
};

type Props = {
    assistants: Assistant[];
    search: string;
};

export function AssistantList({ assistants, search }: Props) {
    const filteredAssistants = assistants.filter((assistant) =>
        assistant.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredAssistants.length === 0) {
        return (
            <div className="flex items-center justify-center gap-1 text-secondary py-10">
                <XIcon className="size-5" />
                No se encontraron resultados...
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredAssistants.map((assistant) => (
                <AssistantCard
                    key={assistant.id}
                    assistant={assistant}
                />
            ))}
        </div>
    );
}
