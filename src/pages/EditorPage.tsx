import { useState } from "react";
import SplitterComponent from "@/components/SplitterComponent";
import ConnectionStatusPage from "@/components/connection/ConnectionStatusPage";
import Sidebar from "@/components/sidebar/Sidebar";
import WorkSpace from "@/components/workspace";
import Chatbot from "@/components/Chatbot/Chatbot";
import { useAppContext } from "@/context/AppContext";
import { useSocket } from "@/context/SocketContext";
import useFullScreen from "@/hooks/useFullScreen";
import useUserActivity from "@/hooks/useUserActivity";
import { SocketEvent } from "@/types/socket";
import { USER_STATUS, User } from "@/types/user";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Added animation

function EditorPage() {
    useUserActivity();
    useFullScreen();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const { status, setCurrentUser, currentUser } = useAppContext();
    const { socket } = useSocket();
    const location = useLocation();

    // Chatbot visibility state
    const [isChatbotVisible, setIsChatbotVisible] = useState(false);

    const toggleChatbotVisibility = () => {
        setIsChatbotVisible((prev) => !prev);
    };

    useEffect(() => {
        if (currentUser.username.length > 0) return;
        const username = location.state?.username;
        if (username === undefined) {
            navigate("/", { state: { roomId } });
        } else if (roomId) {
            const user: User = { username, roomId };
            setCurrentUser(user);
            socket.emit(SocketEvent.JOIN_REQUEST, user);
        }
    }, [currentUser.username, location.state?.username, navigate, roomId, setCurrentUser, socket]);

    if (status === USER_STATUS.CONNECTION_FAILED) {
        return <ConnectionStatusPage />;
    }

    return (
        <SplitterComponent>
            <Sidebar />
            <WorkSpace />

            {/* Chatbot Toggle Icon (Always Visible) */}
            <div 
                className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full cursor-pointer shadow-lg z-50 flex items-center justify-center"
                onClick={toggleChatbotVisibility}
            >
                🤖
            </div>

            {/* Chatbot Window (Shifted Left to Keep Icon Visible) */}
            <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: isChatbotVisible ? "-20%" : "100%", opacity: isChatbotVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-12 right-6 w-80 bg-black border border-blue-600 rounded-lg shadow-lg p-3 z-40"
            >
                <Chatbot />
            </motion.div>
        </SplitterComponent>
    );
}

export default EditorPage;
