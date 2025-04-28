import { useRunCode } from "@/context/RunCodeContext";
import useResponsive from "@/hooks/useResponsive";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { LuCopy } from "react-icons/lu";
import { PiCaretDownBold } from "react-icons/pi";

function RunView() {
  const { viewHeight } = useResponsive();
  const {
    setInput,
    output,
    isRunning,
    supportedLanguages,
    selectedLanguage,
    setSelectedLanguage,
    runCode,
  } = useRunCode();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const lang = JSON.parse(e.target.value);
    setSelectedLanguage(lang);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Output copied to clipboard");
  };

  return (
    <div
      className="flex flex-col items-center gap-2 p-4 bg-black text-white"
      style={{ height: viewHeight }}
    >
      <h1 className="text-xl font-bold text-blue-400">Run Code</h1>

      <div className="flex h-[90%] w-full flex-col items-end gap-2 md:h-[92%]">
        {/* Language Selection Dropdown */}
        <div className="relative w-full">
          <select
            className="w-full rounded-md border-none bg-gray-900 px-4 py-2 text-white outline-none"
            value={JSON.stringify(selectedLanguage)}
            onChange={handleLanguageChange}
          >
            {supportedLanguages
              .sort((a, b) => (a.language > b.language ? 1 : -1))
              .map((lang, i) => (
                <option key={i} value={JSON.stringify(lang)}>
                  {lang.language + (lang.version ? ` (${lang.version})` : "")}
                </option>
              ))}
          </select>
          <PiCaretDownBold
            size={16}
            className="absolute bottom-3 right-4 z-10 text-blue-400"
          />
        </div>

        {/* Input Textarea */}
        <textarea
          className="min-h-[120px] w-full resize-none rounded-md border border-blue-500 bg-gray-900 p-2 text-white outline-none"
          placeholder="Write your input here..."
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Run Button */}
        <button
          className="flex w-full justify-center rounded-md bg-blue-500 p-2 font-bold text-white hover:bg-blue-600 transition duration-200 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={runCode}
          disabled={isRunning}
        >
          Run
        </button>

        {/* Output Section */}
        <label className="flex w-full justify-between text-blue-400">
          Output:
          <button onClick={copyOutput} title="Copy Output">
            <LuCopy size={18} className="cursor-pointer text-white hover:text-blue-400" />
          </button>
        </label>

        {/* Output Display */}
        <div className="w-full flex-grow resize-none overflow-y-auto rounded-md border border-blue-500 bg-gray-900 p-2 text-white outline-none">
          <code>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </code>
        </div>
      </div>
    </div>
  );
}

export default RunView;
