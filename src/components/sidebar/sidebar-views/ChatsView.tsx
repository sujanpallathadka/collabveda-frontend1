import ChatInput from "@/components/chats/ChatInput";
import ChatList from "@/components/chats/ChatList";

import useResponsive from "@/hooks/useResponsive";

const ChatsView = () => {
    const { viewHeight } = useResponsive();

    return (
        <div
            className="flex max-h-full min-h-[400px] w-full flex-col gap-4 p-4 bg-black text-white rounded-lg shadow-lg border border-blue-500"
            style={{ height: viewHeight }}
        >
            {/* Chat Title */}
            <h1 className="text-2xl font-bold text-blue-400 text-center">
                Collab-Vedha Chat
            </h1>

            {/* Chat List */}
            <div className="flex-grow overflow-y-auto border border-blue-500 rounded-md bg-gray-900 p-2">
                <ChatList />
            </div>

           

            {/* Chat Input */}
            <div className="border-t border-blue-500 pt-2">
                <ChatInput />
            </div>
        </div>
    );
};

export default ChatsView;
