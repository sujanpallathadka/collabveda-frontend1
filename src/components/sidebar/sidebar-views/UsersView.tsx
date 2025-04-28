import Users from "@/components/common/Users"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import useResponsive from "@/hooks/useResponsive"
import { USER_STATUS } from "@/types/user"
import toast from "react-hot-toast"
import { GoSignOut } from "react-icons/go"
import { IoShareOutline } from "react-icons/io5"
import { LuCopy } from "react-icons/lu"
import { useNavigate } from "react-router-dom"

function UsersView() {
    const navigate = useNavigate()
    const { viewHeight } = useResponsive()
    const { setStatus } = useAppContext()
    const { socket } = useSocket()

    const copyURL = async () => {
        const url = window.location.href
        try {
            await navigator.clipboard.writeText(url)
            toast.success("URL copied to clipboard")
        } catch (error) {
            toast.error("Unable to copy URL")
            console.error(error)
        }
    }

    const shareURL = async () => {
        const url = window.location.href
        try {
            await navigator.share({ url })
        } catch (error) {
            toast.error("Unable to share URL")
            console.error(error)
        }
    }

    const leaveRoom = () => {
        socket.disconnect()
        setStatus(USER_STATUS.DISCONNECTED)
        navigate("/", { replace: true })
    }

    return (
        <div
            className="flex flex-col items-center p-6 bg-darkPrimary shadow-lg rounded-lg"
            style={{ height: viewHeight }}
        >
            <h1 className="text-2xl font-semibold text-white mb-4">Connected Users</h1>

            {/* List of connected users */}
            <div className="w-full p-4 bg-darkHover rounded-lg shadow-md">
                <Users />
            </div>

            {/* Actions */}
            <div className="flex w-full justify-between gap-4 mt-6">
                {/* Share URL button */}
                <button
                    className="flex items-center justify-center w-1/3 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
                    onClick={shareURL}
                    title="Share Link"
                >
                    <IoShareOutline size={26} />
                </button>

                {/* Copy URL button */}
                <button
                    className="flex items-center justify-center w-1/3 p-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition-all"
                    onClick={copyURL}
                    title="Copy Link"
                >
                    <LuCopy size={22} />
                </button>

                {/* Leave Room button */}
                <button
                    className="flex items-center justify-center w-1/3 p-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
                    onClick={leaveRoom}
                    title="Leave Room"
                >
                    <GoSignOut size={22} />
                </button>
            </div>
        </div>
    )
}

export default UsersView
