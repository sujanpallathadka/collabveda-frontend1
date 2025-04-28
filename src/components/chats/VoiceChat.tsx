
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("import.meta.env.VITE_BACKEND_URL", { transports: ["websocket"] });

interface VoiceMessage {
    id: string;
    audioBase64: string;
    username: string;
    timestamp: string;
}

const VoiceChat = () => {
    const [messages, setMessages] = useState<React.ReactNode[]>([]);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Listen for voice messages
    useEffect(() => {
        socket.on("voice_note", ({ audioBase64, username }: VoiceMessage) => {
            const audioBlob = base64ToBlob(audioBase64);
            const audioUrl = URL.createObjectURL(audioBlob);

            const voiceMessageElement = (
                <div className="text-sm py-1 border-b border-gray-700">
                    <strong>{username}</strong>: <audio controls src={audioUrl} />
                </div>
            );

            setMessages((prev) => [...prev, voiceMessageElement]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // Convert Blob to Base64
    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) resolve(reader.result.toString().split(',')[1]);
                else reject("Conversion failed");
            };
            reader.readAsDataURL(blob);
        });
    };

    // Convert Base64 to Blob
    const base64ToBlob = (base64: string): Blob => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length)
            .fill(0)
            .map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: "audio/webm" });
    };

    // Start recording
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setAudioChunks([]);

        recorder.ondataavailable = (e) => {
            setAudioChunks((prev) => [...prev, e.data]);
        };

        recorder.onstop = async () => {
            const fullBlob = new Blob(audioChunks, { type: "audio/webm" });
            const base64Audio = await blobToBase64(fullBlob);
            socket.emit("voice_note", {
                audioBase64: base64Audio,
                username: "Sinchana", // 🔁 Replace with actual username dynamically
                timestamp: new Date().toISOString(),
                id: crypto.randomUUID(), // for uniqueness
            });

            const audioUrl = URL.createObjectURL(fullBlob);
            const voiceMessageElement = (
                <div className="text-sm py-1 border-b border-gray-700">
                    <strong>You</strong>: <audio controls src={audioUrl} />
                </div>
            );

            setMessages((prev) => [...prev, voiceMessageElement]);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
    };

    // Stop recording
    const stopRecording = () => {
        mediaRecorder?.stop();
        setIsRecording(false);
    };

    return (
        

            <audio ref={audioRef} autoPlay hidden></audio>

          
    );
};

export default VoiceChat;