export interface AssistantForm {
    name: string;
    language: string;
    tone: string;
    description: string;
    responseLength: {
        short: number;
        medium: number;
        long: number;
    };
    audioEnabled: boolean;
}

export interface Assistant extends AssistantForm {
    id: string;
}
