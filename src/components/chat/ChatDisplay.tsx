import { FunctionComponent, useEffect, useMemo, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { Message, Status, State } from "../../types/messageTypes";
import StatusMessage from "./statusMessage";
import { Container } from "react-bootstrap";
import ChatLineBreak from "./ChatLineBreak";

interface ChatDisplayProps {
    messages: Message[];
    status: Status;
}

const ChatDisplay: FunctionComponent<ChatDisplayProps> = ({ messages, status }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const messagelist = useMemo(
        () =>
            messages.map((message, i) => {
                if (message.body !== "") {
                    return <ChatMessage key={`msg-${i}`} message={message} />;
                } else {
                    return <ChatLineBreak key={`msg-${i}`} created_dtm={message.created_dtm} />;
                }
            }),
        [messages]
    );

    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].body !== "") scrollToBottom();
    }, [messages, status]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const drawStatus = () => {
        if (status.state !== State.IDLE) {
            return <StatusMessage status={status} />;
        }
    };

    return (
        <div className="flex-fill chat-display-container">
            <Container>
                <div style={{ height: "1rem" }}></div>
                {messagelist}
                {drawStatus()}
                <div ref={messagesEndRef} />
            </Container>
        </div>
    );
};

export default ChatDisplay;
