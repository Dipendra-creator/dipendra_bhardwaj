"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { IconSend, IconX, IconMessage, IconMicrophone, IconMicrophoneOff } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useVoiceActivation } from "@/hooks/useVoiceActivation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Dipendra Bhardwaj's AI assistant. Ask me anything about my experience, projects, or tech skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isSpeakingRef = useRef(false);
  const speakFnRef = useRef<((text: string, onEnd?: () => void) => void) | null>(null);
  const isVoiceModeRef = useRef(false);

  const handleSpeechRecognized = useCallback(async (text: string) => {
    if (isSpeakingRef.current || isLoading) return;
    
    // Handle empty text (silence after wake word)
    if (!text || text.trim() === "") {
      console.log("No speech detected - providing default prompt");
      const promptMessage = "I'm listening! How can I help you today?";
      const assistantMessage: Message = {
        role: "assistant",
        content: promptMessage,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      isSpeakingRef.current = true;
      speakFnRef.current?.(promptMessage, () => {
        isSpeakingRef.current = false;
      });
      return;
    }
    
    console.log("Processing user speech:", text);
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Speak the response
      if (isVoiceModeRef.current && data.message) {
        isSpeakingRef.current = true;
        speakFnRef.current?.(data.message, () => {
          isSpeakingRef.current = false;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      if (isVoiceModeRef.current) {
        isSpeakingRef.current = true;
        speakFnRef.current?.("Sorry, I encountered an error. Please try again.", () => {
          isSpeakingRef.current = false;
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]); // Stable dependencies

  const handleWakeWordDetected = useCallback(() => {
    console.log("Wake word detected - activating voice mode");
    setIsOpen(true);
    // Speak greeting
    const greeting = "Hey! I'm listening. What would you like to know?";
    const greetingMessage: Message = {
      role: "assistant",
      content: greeting,
    };
    setMessages((prev) => [...prev, greetingMessage]);
    
    isSpeakingRef.current = true;
    speakFnRef.current?.(greeting, () => {
      isSpeakingRef.current = false;
    });
  }, []); // No dependencies needed

  const {
    isListening,
    isVoiceMode,
    transcript,
    isSupported,
    speak,
    stopSpeaking,
    exitVoiceMode,
  } = useVoiceActivation({
    wakeWord: "hey dipendra",
    onWakeWordDetected: handleWakeWordDetected,
    onSpeechRecognized: handleSpeechRecognized,
    enabled: voiceEnabled,
  });

  // Update refs when values change
  useEffect(() => {
    speakFnRef.current = speak;
    isVoiceModeRef.current = isVoiceMode;
  }, [speak, isVoiceMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-enable voice on component mount
  useEffect(() => {
    setVoiceEnabled(true);
    return () => {
      setVoiceEnabled(false);
      stopSpeaking();
    };
  }, [stopSpeaking]);

  const toggleVoiceMode = () => {
    if (isVoiceMode) {
      exitVoiceMode();
    } else {
      setVoiceEnabled(!voiceEnabled);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Voice Mode Indicator - Shows when listening for wake word */}
      {voiceEnabled && !isOpen && (
        <div className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-black to-neutral-800 text-white px-4 py-2 rounded-full text-sm flex items-center space-x-2 shadow-lg border border-neutral-700">
          <div className="relative">
            <IconMicrophone className="w-4 h-4" />
            {isListening && (
              <>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
              </>
            )}
          </div>
          <div>
            <span className="font-semibold">Say &quot;Hey Dipendra&quot;</span>
            {transcript && !isVoiceMode && (
              <p className="text-xs text-green-400 mt-0.5">{transcript}</p>
            )}
          </div>
        </div>
      )}

      {/* Voice Mode Active Indicator */}
      {isVoiceMode && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 animate-pulse">
          <IconMicrophone className="w-5 h-5" />
          <div>
            <p className="font-semibold">Voice Mode Active</p>
            {transcript && (
              <p className="text-xs opacity-90">{transcript}</p>
            )}
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label="Open chat"
        >
          <IconMessage className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white border border-neutral-200 rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-black text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">Chat with Dipendra</h3>
              {isVoiceMode && (
                <span className="text-xs bg-green-500 px-2 py-1 rounded-full animate-pulse">
                  Voice Active
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {isSupported && (
                <button
                  onClick={toggleVoiceMode}
                  className={`p-1 rounded transition-colors ${
                    voiceEnabled
                      ? "bg-green-600 hover:bg-green-700"
                      : "hover:bg-neutral-800"
                  }`}
                  aria-label="Toggle voice mode"
                  title={voiceEnabled ? "Voice listening enabled" : "Enable voice listening"}
                >
                  {voiceEnabled ? (
                    <IconMicrophone className="w-5 h-5" />
                  ) : (
                    <IconMicrophoneOff className="w-5 h-5" />
                  )}
                </button>
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (isVoiceMode) exitVoiceMode();
                }}
                className="hover:bg-neutral-800 p-1 rounded"
                aria-label="Close chat"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-black text-white"
                      : "bg-neutral-100 text-neutral-900"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className="chatbot-markdown">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200">
            {isVoiceMode && (
              <div className="mb-2 text-xs text-center text-neutral-600 flex items-center justify-center space-x-2">
                <IconMicrophone className="w-4 h-4 text-green-600 animate-pulse" />
                <span>Listening... Speak your question</span>
              </div>
            )}
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isVoiceMode ? "Voice mode active..." : "Ask me anything..."}
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                disabled={isLoading || isVoiceMode}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || isVoiceMode}
                className="bg-black text-white p-2 rounded-lg hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <IconSend className="w-5 h-5" />
              </button>
            </div>
            {!isSupported && (
              <p className="text-xs text-amber-600 mt-2">
                Voice features not supported in this browser. Try Chrome or Edge.
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
};
