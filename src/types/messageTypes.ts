export interface Message {
    created_dtm: number;
    author: string;
    is_bot: boolean;
    body: string;
}

export enum State {
    IDLE = 1,
    BUSY = 2,
    FAILED = 3,
}

export interface Status {
    state: State;
    detail: string;
}

export interface MessagePair {
    user_message: Message;
    bot_message: Message;
}
