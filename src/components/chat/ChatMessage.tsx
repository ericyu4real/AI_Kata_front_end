import { FunctionComponent, useMemo } from "react";
import Image from "react-bootstrap/Image";
import { Message } from "../../types/messageTypes";

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: FunctionComponent<ChatMessageProps> = ({ message }) => {
    // memoize horizontal layout of name / dtm
    const nameLine = useMemo(() => {
        const components = [
            <div className="pb-2 fw-bold  text-nowrap text-small" key="msg-header-author">
                {message.author}
            </div>,
            <div className="message-dtm text-secondary px-2 text-nowrap" key="msg-header-time">
                {new Date(message.created_dtm).toLocaleString()}
            </div>,
        ];
        if (!message.is_bot) return components.reverse();
        return components;
    }, [message]);

    // memoize horizontal layout of profile pic / body
    const horizontalLayout = useMemo(() => {
        const src = message.is_bot ? "/img/profile_bot.jpg" : "/img/profile_user.jpg";
        const components = [
            <div>
                <Image className="profile-circle" style={{ height: "50px" }} src={src} roundedCircle />
            </div>,
            <div className={"flex-fill px-3 " + (message.is_bot ? "" : "text-secondary text-end")}>
                <div className={"d-flex" + (message.is_bot ? "" : " justify-content-end")}>{nameLine}</div>
                <div>{message.body}</div>
            </div>,
        ];
        if (!message.is_bot) return components.reverse();
        return components;
    }, [message, nameLine]);

    return (
        <div
            className={`chat-message d-flex p-2 my-3 chat-fly-${message.is_bot ? "left" : "right"}-animation border shadow-sm bg-opacity-10 ${
                message.is_bot ? "bg-info" : "bg-secondary ms-auto"
            }`}
        >
            {horizontalLayout}
        </div>
    );
};

export default ChatMessage;
