import { FunctionComponent, useState, useEffect } from "react";
import ChatDisplay from "./chat/ChatDisplay";
import ChatInput from "./chat/ChatInput";
import { Message, State, Status } from "../types/messageTypes";
import { getRandomGreeting } from "../utils/greetings";

const API_URL = import.meta.env.VITE_API_URL;

interface ChatProps {}

const Chat: FunctionComponent<ChatProps> = ({}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [status, setStatus] = useState<Status>({ state: State.IDLE, detail: "" });

    // load chat history
    useEffect(() => {
        const messages_str = localStorage.getItem("history");
        if (messages_str !== null) {
            const linebreak: Message = {
                created_dtm: Date.now(),
                body: "",
                author: "system",
                is_bot: false,
            };
            console.log(JSON.parse(messages_str));
            setMessages([...JSON.parse(messages_str), linebreak]);
        }

        // Send a greeting message after 2 seconds
        const greetingTimeout = setTimeout(() => {
            const greetingMessage: Message = {
                author: import.meta.env.VITE_BOT_NAME,
                created_dtm: Date.now(),
                body: getRandomGreeting(),
                is_bot: true,
            };
            setMessages((currentMessages) => [...currentMessages, greetingMessage]);
        }, 1000);

        return () => clearTimeout(greetingTimeout);
    }, []);

    const sendMessage = (message: Message) => {
        if (typeof message.body !== "string") return;

        setMessages((cur) => [...cur, message]);
        setStatus({ state: State.BUSY, detail: "Waiting for response..." });

        const formData = new FormData();
        formData.append("query", message.body);
        fetch(API_URL + "/query", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => {
                const msg: Message = {
                    author: import.meta.env.VITE_BOT_NAME,
                    created_dtm: Date.now(),
                    body: result.response,
                    is_bot: true,
                };
                setMessages((cur) => {
                    const temp = [...cur, msg];
                    localStorage.setItem("history", JSON.stringify(temp));
                    return temp;
                });
                console.log(result);
                setStatus({ state: State.IDLE, detail: "" });
            })
            .catch((err) => {
                console.log(err);
                setStatus({
                    state: State.FAILED,
                    detail: err.message,
                });
            });
    };

    const clearHistory = () => {
        setMessages([]);
        localStorage.removeItem("history");
    };

    return (
        <>
            <ChatDisplay status={status} messages={messages} />
            <ChatInput status={status} setStatus={setStatus} sendMessage={sendMessage} clearHistory={clearHistory} />
        </>
    );
};

export default Chat;
