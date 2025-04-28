import Select from "@/components/common/Select"
import { useSettings } from "@/context/SettingContext"
import useResponsive from "@/hooks/useResponsive"
import { editorFonts } from "@/resources/Fonts"
import { editorThemes } from "@/resources/Themes"
import { langNames } from "@uiw/codemirror-extensions-langs"
import {  useEffect } from "react"


function SettingsView() {
    const {
        theme,
        setTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        
        resetSettings,
    } = useSettings()
    const { viewHeight } = useResponsive()

    useEffect(() => {
        // Set editor font family dynamically
        const editor = document.querySelector(
            ".cm-editor > .cm-scroller"
        ) as HTMLElement
        if (editor) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])

    return (
        <div
            className="flex flex-col items-center gap-4 p-6 bg-darkPrimary shadow-lg rounded-lg"
            style={{ height: viewHeight }}
        >
            <h1 className="text-2xl font-semibold text-white">Editor Settings</h1>

            {/* Font Settings */}
            <div className="flex w-full items-center gap-3">
                <Select
                    onChange={(e) => setFontFamily(e.target.value)}
                    value={fontFamily}
                    options={editorFonts}
                    title="Font Family"
                />
                <select
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="rounded-lg border-none bg-darkHover px-4 py-2 text-white outline-none hover:bg-darkSecondary transition"
                    title="Font Size"
                >
                    {[...Array(13).keys()].map((size) => (
                        <option key={size} value={size + 12}>
                            {size + 12}
                        </option>
                    ))}
                </select>
            </div>

            {/* Theme Selector */}
            <Select
                onChange={(e) => setTheme(e.target.value)}
                value={theme}
                options={Object.keys(editorThemes)}
                title="Theme"
            />

            {/* Language Selector */}
            <Select
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                options={langNames}
                title="Language"
            />

            
            {/* Reset Button */}
            <button
                className="w-full mt-4 rounded-lg bg-red-500 px-5 py-2 text-white font-medium hover:bg-red-600 transition-all"
                onClick={resetSettings}
            >
                Reset to Default
            </button>
        </div>
    )
}

export default SettingsView
