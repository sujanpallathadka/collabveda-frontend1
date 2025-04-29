import { useViews } from "@/context/ViewContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { ReactNode } from "react";
import Split from "react-split";

function SplitterComponent({ children }: { children: ReactNode[] }) {
    const { isSidebarOpen } = useViews();
    const { isMobile, width } = useWindowDimensions();
    const { setItem, getItem } = useLocalStorage();

    const getGutter = (index: number, direction: string) => {
        const gutter = document.createElement("div");
        gutter.className = "h-full cursor-e-resizer hidden md:block";
        gutter.style.backgroundColor = "#e1e1ffb3";
        gutter.style.width = "7px";  // Move style here
        return gutter;
    };

    const getSizes = () => {
        if (isMobile) return [0, width];
        const savedSizes = getItem("editorSizes");
        let sizes = [35, 65];
        if (savedSizes) {
            sizes = JSON.parse(savedSizes);
        }
        return isSidebarOpen ? sizes : [0, width];
    };

    const getMinSizes = () => (isMobile ? [0, width] : isSidebarOpen ? [350, 350] : [50, 0]);

    const getMaxSizes = () => (isMobile ? [0, Infinity] : isSidebarOpen ? [Infinity, Infinity] : [0, Infinity]);

    const handleGutterDrag = (sizes: number[]) => {
        setItem("editorSizes", JSON.stringify(sizes));
    };

    return (
        <Split
            sizes={getSizes()}
            minSize={getMinSizes()}
            maxSize={getMaxSizes()}
            dragInterval={1}
            direction="horizontal"
            gutterAlign="center"
            cursor="e-resize"
            snapOffset={30}
            onDrag={handleGutterDrag}
            gutter={getGutter}
            className="flex h-screen min-h-screen max-w-full items-center justify-center overflow-hidden"
        >
            {children.map((child, index) =>
                typeof child === "string" ? <span key={index}>{child}</span> : child
            )}
        </Split>
    );
}

export default SplitterComponent;
