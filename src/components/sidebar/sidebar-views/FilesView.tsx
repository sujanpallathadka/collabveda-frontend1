import { useState } from "react"
import FileStructureView from "@/components/files/FileStructureView"
import { useFileSystem } from "@/context/FileContext"
import useResponsive from "@/hooks/useResponsive"
import { FileSystemItem } from "@/types/file"
import cn from "classnames"
import { BiArchiveIn } from "react-icons/bi"
import { TbFileUpload } from "react-icons/tb"
import { v4 as uuidV4 } from "uuid"
import { toast } from "react-hot-toast"

function FilesView() {
    const { downloadFilesAndFolders, updateDirectory } = useFileSystem()
    const { viewHeight, minHeightReached } = useResponsive()
    const [isLoading, setIsLoading] = useState(false)

    const handleOpenDirectory = async () => {
        try {
            setIsLoading(true)

            // Check if File System API is supported
            if (!("showDirectoryPicker" in window)) {
                toast.error("Your browser does not support directory selection.")
                return
            }

            const directoryHandle = await window.showDirectoryPicker()
            await processDirectoryHandle(directoryHandle)
        } catch (error) {
            console.error("Error opening directory:", error)
            toast.error("Failed to open directory")
        } finally {
            setIsLoading(false)
        }
    }

    const processDirectoryHandle = async (directoryHandle: any) => {
        try {
            toast.loading("Getting files and folders...")
            const structure = await readDirectory(directoryHandle)

            updateDirectory("", structure || []) // Ensure no undefined data
            toast.dismiss()
            toast.success("Directory loaded successfully")
        } catch (error) {
            console.error("Error processing directory:", error)
            toast.error("Failed to process directory")
        }
    }

    const readDirectory = async (directoryHandle: any): Promise<FileSystemItem[]> => {
        const children: FileSystemItem[] = []
        const blackList = ["node_modules", ".git", ".vscode", ".next"]

        for await (const entry of directoryHandle.values()) {
            if (entry.kind === "file") {
                const file = await entry.getFile()
                children.push({
                    id: uuidV4(),
                    name: entry.name,
                    type: "file",
                    content: await readFileContent(file),
                })
            } else if (entry.kind === "directory" && !blackList.includes(entry.name)) {
                children.push({
                    id: uuidV4(),
                    name: entry.name,
                    type: "directory",
                    children: await readDirectory(entry),
                    isOpen: false,
                })
            }
        }
        return children
    }

    const readFileContent = async (file: File): Promise<string> => {
        const MAX_FILE_SIZE = 1024 * 1024 // 1MB limit

        if (file.size > MAX_FILE_SIZE) {
            return `File too large: ${file.name} (${Math.round(file.size / 1024)}KB)`
        }

        try {
            return await file.text()
        } catch (error) {
            console.error(`Error reading file ${file.name}:`, error)
            return `Error reading file: ${file.name}`
        }
    }

    return (
        <div className="flex select-none flex-col gap-1 px-4 py-2"
            style={{ height: viewHeight, maxHeight: viewHeight }}
        >
            <FileStructureView />
            <div className={cn("flex min-h-fit flex-col justify-end pt-2", { hidden: minHeightReached })}>
                <hr />
                <button
                    className="mt-2 flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                    onClick={handleOpenDirectory}
                    disabled={isLoading}
                >
                    <TbFileUpload className="mr-2" size={24} />
                    {isLoading ? "Loading..." : "Open File/Folder"}
                </button>
                <button
                    className="flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                    onClick={downloadFilesAndFolders}
                >
                    <BiArchiveIn className="mr-2" size={22} /> Download Code
                </button>
            </div>
        </div>
    )
}

export default FilesView
