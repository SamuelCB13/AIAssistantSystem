import { AssistantForm } from '@/types/assistant';

export const INITIAL_ASSISTANT_FORM: AssistantForm = {
    name: '',
    language: '',
    tone: '',
    description: '',
    responseLength: {
        short: 0,
        medium: 0,
        long: 0,
    },
    audioEnabled: false,
};
