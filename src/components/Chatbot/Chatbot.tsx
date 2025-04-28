import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    setMessages((prev) => [...prev, { sender: "You", text: input }]);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
  
      const data = await response.json();
      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received from Gemini.";
  
      setMessages((prev) => [...prev, { sender: "Collab-Vedha", text: aiResponse }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "Collab-Vedha", text: "Sorry, I couldn't process that request." },
      ]);
    }
  
    setInput("");
  };
  
  return (
    <div className="fixed bottom-4 right-4 w-80 border-2 border-blue-600 bg-black rounded-lg shadow-lg p-3">
      {/* Collab-Vedha Chatbot Title */}
      <div className="bg-black text-blue-400 text-center font-semibold py-2 rounded-t-md border-b-2 border-blue-600">
        Collab-Vedha Assistant
      </div>

      {/* Chat History */}
      <div className="h-64 overflow-y-auto p-2 bg-black flex flex-col space-y-2 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 text-sm rounded-md max-w-[80%] ${
              msg.sender === "You"
                ? "bg-blue-600 text-white self-end"
                : "bg-white text-black self-start"
            }`}
          >
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex gap-2 p-2 bg-black border-t border-blue-600">
        <textarea
          className="flex-1 border-2 border-blue-600 rounded-md p-2 bg-black text-white outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Ask me something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          rows={2}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-800 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
