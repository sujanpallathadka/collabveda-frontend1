import SidebarButton from "@/components/sidebar/sidebar-views/SidebarButton"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { useViews } from "@/context/ViewContext"
import useResponsive from "@/hooks/useResponsive"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ACTIVITY_STATE } from "@/types/app"
import { SocketEvent } from "@/types/socket"
import { VIEWS } from "@/types/view"
import { IoCodeSlash } from "react-icons/io5"
import { MdOutlineDraw } from "react-icons/md"
import cn from "classnames"
import { Tooltip } from "react-tooltip"
import { useState } from "react"
import { tooltipStyles } from "./tooltipStyles"

function Sidebar() {
    const { activeView, isSidebarOpen, viewComponents, setIsSidebarOpen } = useViews() // Removed viewIcons
    const { minHeightReached } = useResponsive()
    const { activityState, setActivityState } = useAppContext()
    const { socket } = useSocket()
    const { isMobile } = useWindowDimensions()
    const [showTooltip, setShowTooltip] = useState(true)

    const toggleActivityState = () => {
        setShowTooltip(false)
        const newState = activityState === ACTIVITY_STATE.CODING ? ACTIVITY_STATE.DRAWING : ACTIVITY_STATE.CODING
        setActivityState(newState)

        if (newState === ACTIVITY_STATE.DRAWING) {
            socket.emit(SocketEvent.REQUEST_DRAWING)
        }

        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    return (
        <aside className="flex w-full md:h-full md:w-auto">
            {/* Sidebar Navigation */}
            <div
                className={cn(
                    "fixed bottom-0 left-0 z-50 flex h-[50px] w-full gap-4 border-t border-darkHover bg-dark p-2 shadow-lg md:static md:h-full md:w-[50px] md:min-w-[50px] md:flex-col md:border-r md:border-t-0 md:p-3 md:pt-4",
                    { hidden: minHeightReached },
                )}
            >
                {/* Sidebar Buttons */}
                {Object.values(VIEWS).map((view) => (
                    <SidebarButton key={view} viewName={view} />  
                ))}

                {/* Toggle Activity Button (Coding ↔ Drawing) */}
                <div className="flex items-center justify-center h-fit">
                    <button
                        className="flex items-center justify-center rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-gray-700"
                        onClick={toggleActivityState}
                        onMouseEnter={() => setShowTooltip(true)}
                        data-tooltip-id="activity-state-tooltip"
                        data-tooltip-content={
                            activityState === ACTIVITY_STATE.CODING ? "Switch to Drawing Mode" : "Switch to Coding Mode"
                        }
                    >
                        {activityState === ACTIVITY_STATE.CODING ? <MdOutlineDraw size={26} /> : <IoCodeSlash size={26} />}
                    </button>

                    {/* Tooltip for Mode Switch */}
                    {showTooltip && (
                        <Tooltip
                            id="activity-state-tooltip"
                            place="right"
                            offset={15}
                            className="!z-50"
                            style={tooltipStyles}
                            noArrow={false}
                            positionStrategy="fixed"
                            float={true}
                        />
                    )}
                </div>
            </div>

            {/* Sidebar Content Panel */}
            {isSidebarOpen && (
                <div className="absolute left-0 top-0 z-20 w-full flex-col bg-dark md:static md:min-w-[300px]">
                    {viewComponents[activeView]}
                </div>
            )}
        </aside>
    )
}

export default Sidebar
