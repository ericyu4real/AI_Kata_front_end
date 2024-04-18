import { FunctionComponent, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Message, State, Status } from "../../types/messageTypes";

const MINIMUM_DELAY = parseInt(process.env.NEXT_PUBLIC_MINIMUM_DELAY ?? "0");

interface ChatInputProps {
    clearHistory: () => void;
    sendMessage: (message: Message) => void;
    status: Status;
    setStatus: (s: Status) => void;
}

const ChatInput: FunctionComponent<ChatInputProps> = ({ sendMessage, clearHistory, status, setStatus }) => {
    const [messageText, setMessageText] = useState("");
    const [lastSendTime, setLastSendTime] = useState(0);

    const validateInput = (messageText: string) => {
        const now = Date.now();
        if (status.state === State.BUSY || messageText.trim().length === 0) return false;
        if (now - lastSendTime < MINIMUM_DELAY) {
            setStatus({
                state: State.FAILED,
                detail: `Slow down, ${process.env.NEXT_PUBLIC_BOT_NAME} cannot process another question just yet...`,
            });
            return false;
        }
        setLastSendTime(now);
        // add other validation conditions
        return true;
    };

    const submit = () => {
        if (validateInput(messageText)) {
            const message: Message = {
                created_dtm: Date.now(),
                author: "You",
                body: messageText,
                is_bot: false,
            };
            sendMessage(message);
            setMessageText("");
        }
    };

    return (
        <Container className="p-2 chat-input-animation">
            <div className="d-flex w-100 bg-primary bg-opacity-10 p-2 border border-secondary border-opacity-25 rounded x-4 shadow chat-input-container">
                <Form.Control
                    value={messageText}
                    onChange={(e) => {
                        setMessageText(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            submit();
                        }
                    }}
                    className="border-0 shadow-none bg-transparent"
                    as="textarea"
                    placeholder="Ask me a question"
                />
                <Button
                    className="ms-2"
                    variant="outline-secondary"
                    onClick={submit}
                    disabled={messageText.length === 0 || status.state == State.BUSY}
                >
                    <i className="fa-solid fa-comment" />
                </Button>
                <div className="clear-chat-button text-secondary" onClick={clearHistory}>
                    Clear Chat
                </div>
            </div>
        </Container>
    );
};

export default ChatInput;
