export interface ConversationSummary {
    id: number;
    title: string;
    updatedAt: string;
}

export interface ConversationListResponse {
    data: ConversationSummary[],
    total: number;
    page: number;
    limit: number;
}

export interface ConversationDetail {
    id: number;
    title: string;
    messages: {
        role: 'user' | 'assistant';
        content: string;
    }[]
}