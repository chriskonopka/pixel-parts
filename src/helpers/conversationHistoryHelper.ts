import { arrayToFileList } from './fileHelpers';

export interface ConversationHistory {
    files: FileList;
    conversation: string;
}

export const getConversationHistory = async (db, storeName): Promise<ConversationHistory> => {
    let files;
    let conversation;

    const data = await db.getAll(storeName);

    if (data) {
        const conversationItems = `${data.map(item => `
            User: ${item.question}
            Assistant: ${item.response}`
        ).join()}`;

        if (conversationItems !== '') {
            conversation = `
                ### CONVERSATION_HISTORY
                **Below is the conversational (Chat) history. Take this into account before you answer the next question.**
                <<HISTORY_START>>
                ${conversationItems}
                <<HISTORY_END>>
            `;
        }

        const fileList = arrayToFileList(data.map(item => item.files).flat());

        files = Array.from(fileList).length ? fileList : null;
    }

    return { files, conversation };
}