import { FunctionComponent } from "react";

interface ChatLineBreakProps {
    created_dtm: number;
}

const ChatLineBreak: FunctionComponent<ChatLineBreakProps> = ({ created_dtm }) => {
    return (
        <div className="p-1 w-100 mb-2 position-relative opacity-50">
            <hr/>
            <div className="hr-label px-3 text-secondary text-nowrap">{new Date(created_dtm).toLocaleString()}</div>
            
        </div>
    );
};

export default ChatLineBreak;
