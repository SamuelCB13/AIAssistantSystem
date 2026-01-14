export type Assistant = {
    id: string;
    name: string;
    language: string;
    tone: string;
    responseLength: {
        short: number;
        medium: number;
        long: number;
    };
    audioEnabled: boolean;
    rules: string;
};
