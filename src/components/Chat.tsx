import { FunctionComponent, useState, useEffect } from "react";
import ChatDisplay from "./chat/ChatDisplay";
import ChatInput from "./chat/ChatInput";
import { Message, MessagePair, State, Status } from "../types/messageTypes";
import { getRandomGreeting } from "../utils/greetings";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_HISTORY = parseInt(process.env.NEXT_PUBLIC_MAX_HISTORY ?? "0");
const BOT_NAME = process.env.NEXT_PUBLIC_BOT_NAME ?? "Bot";

// interface ChatProps {}

const Chat: FunctionComponent = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [status, setStatus] = useState<Status>({ state: State.IDLE, detail: "" });
    const [sessionHistory, setSessionHistory] = useState<MessagePair[]>([]);

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
            setMessages([...JSON.parse(messages_str), linebreak]);
        }

        // Send a greeting message after 2 seconds
        const greetingTimeout = setTimeout(() => {
            const greetingMessage: Message = {
                author: BOT_NAME,
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
        formData.append("history", JSON.stringify(sessionHistory));
        fetch(API_URL + "/query", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log('Chat History:', result.chat_history);
                // success message response
                const res_msg: Message = {
                    author: BOT_NAME,
                    created_dtm: Date.now(),
                    body: result.response,
                    is_bot: true,
                };

                // track last MAX_HISTORY message exchanges
                if (MAX_HISTORY > 0) {
                    const history = [...sessionHistory];
                    if (history.length >= MAX_HISTORY) {
                        history.shift();
                    }
                    history.push({
                        user_message: message,
                        bot_message: res_msg,
                    });
                    setSessionHistory(history);
                }

                setMessages((cur) => {
                    const temp = [...cur, res_msg];
                    localStorage.setItem("history", JSON.stringify(temp));
                    return temp;
                });
                // console.log(result);
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
