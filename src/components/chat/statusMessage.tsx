import { FunctionComponent } from "react";
import { Status, State } from "../../types/messageTypes";

interface StatusMessageProps {
    status: Status;
}

const StatusMessage: FunctionComponent<StatusMessageProps> = ({ status }) => {
    return (
        <div
            className={
                "zoom-in-animation mx-3 p-3 border rounded my-5 bg-opacity-10 border-opacity-25 " +
                (status.state === State.FAILED ? "text-danger border-danger bg-danger" : "text-info border-info bg-info")
            }
        >
            {status.state === State.FAILED ? (
                <>
                    <span className="fw-bold">Error: </span> {status.detail}
                </>
            ) : (
                <>
                    <i className="fa-solid fa-spinner fa-spin-pulse text-primary me-3" /> {process.env.NEXT_PUBLIC_BOT_NAME} is responding to you...
                </>
            )}
        </div>
    );
};

export default StatusMessage;
