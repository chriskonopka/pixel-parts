export const trunctateString = (prompt: string, characterLimit?: number): string => {
    if (characterLimit && prompt.length > characterLimit) {
        const truncated = prompt.slice(0, characterLimit);
        const lastSpaceIndex = truncated.lastIndexOf(' ');
        return truncated.slice(0, lastSpaceIndex) + '...';
    }
    return prompt;
};