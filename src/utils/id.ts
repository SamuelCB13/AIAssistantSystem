export const generateId = () =>
    Date.now().toString() + Math.random().toString(36).slice(2);
