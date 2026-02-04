"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface UseVoiceActivationProps {
  wakeWord?: string;
  onWakeWordDetected?: () => void;
  onSpeechRecognized?: (text: string) => void;
  enabled?: boolean;
}

export const useVoiceActivation = ({
  wakeWord = "hey dipendra",
  onWakeWordDetected,
  onSpeechRecognized,
  enabled = true,
}: UseVoiceActivationProps = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isRestartingRef = useRef(false);
  const isStoppingRef = useRef(false);
  const noSpeechTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSpeechTimeRef = useRef<number>(0);
  const restartCountRef = useRef(0);
  const lastStartTimeRef = useRef<number>(0);
  const isVoiceModeRef = useRef(false);
  const hasSpeechRef = useRef(false);
  const voicesLoadedRef = useRef(false);

  // Load voices on mount
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        voicesLoadedRef.current = true;
        console.log(`🎵 Loaded ${voices.length} voices`);
      }
    };

    // Load voices immediately
    loadVoices();

    // Also listen for voiceschanged event (some browsers load async)
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Sync isVoiceMode state with ref
  useEffect(() => {
    isVoiceModeRef.current = isVoiceMode;
  }, [isVoiceMode]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition || !window.speechSynthesis) {
      console.warn("Speech Recognition or Speech Synthesis not supported");
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("✅ Speech recognition started");
      setIsListening(true);
      lastStartTimeRef.current = Date.now();
      restartCountRef.current = 0; // Reset restart counter on successful start
      hasSpeechRef.current = false; // Reset speech detection flag
    };

    recognition.onspeechstart = () => {
      console.log("🎤 Speech detected - user is speaking");
      hasSpeechRef.current = true;
    };

    recognition.onspeechend = () => {
      console.log("🔇 Speech ended - user stopped speaking");
    };

    recognition.onresult = (event: any) => {
      // Get the latest result
      const lastResultIndex = event.results.length - 1;
      const result = event.results[lastResultIndex];
      const transcriptText = result[0].transcript.toLowerCase().trim();
      const isFinalResult = result.isFinal;
      
      console.log("🎤 Speech:", transcriptText, "| Final:", isFinalResult, "| VoiceMode:", isVoiceModeRef.current);
      
      // Update transcript for display
      setTranscript(transcriptText);

      // Check for wake word when NOT in voice mode
      if (!isVoiceModeRef.current) {
        const normalized = transcriptText.toLowerCase();
        
        // Simple check - if ANY of these words are present
        const hasWakeWord = 
          normalized.includes("dipendra") ||
          normalized.includes("deependra") ||
          normalized.includes("hey dipendra") ||
          normalized.includes("hey deepinder") ||
          normalized.includes("hey deep") ||
          normalized.includes("hey deependra");
        
        if (hasWakeWord) {
          console.log("✅✅✅ WAKE WORD DETECTED! ✅✅✅");
          setIsVoiceMode(true);
          onWakeWordDetected?.();
          setTranscript("");
          
          // Start silence timer for 3 seconds
          lastSpeechTimeRef.current = Date.now();
          if (noSpeechTimerRef.current) {
            clearTimeout(noSpeechTimerRef.current);
          }
          
          noSpeechTimerRef.current = setTimeout(() => {
            const timeSinceLastSpeech = Date.now() - lastSpeechTimeRef.current;
            if (timeSinceLastSpeech >= 2900) {
              console.log("⏰ No speech after wake word - prompting");
              onSpeechRecognized?.("");
            }
          }, 3000);
          
          return; // Don't stop recognition, just switch mode
        }
        
        // Clear interim results
        if (isFinalResult) {
          setTranscript("");
        }
        return;
      }

      // IN VOICE MODE - process user questions
      if (isVoiceModeRef.current && isFinalResult) {
        console.log("📝 Voice mode - final:", transcriptText);
        
        // Cancel no-speech timer
        if (noSpeechTimerRef.current) {
          clearTimeout(noSpeechTimerRef.current);
          noSpeechTimerRef.current = null;
        }
        
        // Update last speech time
        lastSpeechTimeRef.current = Date.now();
        
        // Clear previous silence timer
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }

        // Wait 1.5s for user to finish
        silenceTimerRef.current = setTimeout(() => {
          const clean = transcriptText.replace(/[.,!?]/g, '').trim();
          
          // Don't process if empty or just wake word
          if (clean && 
              !clean.includes("dipendra") && 
              !clean.includes("deependra") &&
              clean.length > 3) {
            console.log("📤 Sending to AI:", transcriptText);
            onSpeechRecognized?.(transcriptText);
            setTranscript("");
          } else {
            console.log("⚠️ Skipping (empty or wake word)");
            setTranscript("");
          }
        }, 1500);
      }
    };

    recognition.onerror = (event: any) => {
      // Silently ignore aborted errors - these are normal when stopping/restarting
      if (event.error === "aborted" || event.error === "interrupted") {
        return;
      }
      
      console.warn("⚠️ Speech recognition error:", event.error);
      
      // Ignore network errors - will retry automatically
      if (event.error === "network") {
        return;
      }
      
      // Don't restart on "no-speech" - let onend handle it
      if (event.error === "no-speech") {
        return;
      }
    };

    recognition.onend = () => {
      const timeSinceStart = Date.now() - lastStartTimeRef.current;
      console.log("🔴 Recognition ended | VoiceMode:", isVoiceModeRef.current, "| Enabled:", enabled, "| Time running:", timeSinceStart + "ms", "| Had speech:", hasSpeechRef.current);
      setIsListening(false);
      
      // Don't restart if manually stopping or already restarting
      if (!enabled || isStoppingRef.current || isRestartingRef.current) {
        console.log("⛔ Not restarting (manually stopped or already restarting)");
        return;
      }
      
      // If ended too quickly (< 1000ms) without detecting any speech, it's likely an error
      if (timeSinceStart < 1000 && !hasSpeechRef.current) {
        restartCountRef.current++;
        console.log("⚠️ Quick restart detected without speech, count:", restartCountRef.current);
        
        // Stop trying after 5 quick failures
        if (restartCountRef.current > 5) {
          console.error("❌ Too many quick restarts - stopping. Check microphone permissions!");
          setIsSupported(false);
          return;
        }
      } else if (hasSpeechRef.current) {
        // Reset counter if we had actual speech
        restartCountRef.current = 0;
      }
      
      // Prevent multiple simultaneous restarts
      isRestartingRef.current = true;
      
      // Use exponential backoff for retry delay only on errors
      const retryDelay = restartCountRef.current > 0 
        ? Math.min(1000 * Math.pow(2, restartCountRef.current - 1), 5000)
        : 300; // Quick restart if it was normal operation
      console.log("⏱️ Waiting", retryDelay + "ms before restart...");
      
      // Restart after delay
      setTimeout(() => {
        // Double-check conditions before restarting
        if (enabled && !isStoppingRef.current) {
          try {
            console.log("♻️ Attempting restart (attempt:", restartCountRef.current + 1 + ")");
            recognitionRef.current?.start();
          } catch (e) {
            console.error("❌ Failed to restart:", e);
            restartCountRef.current++;
          }
        }
        isRestartingRef.current = false;
      }, retryDelay);
    };

    recognitionRef.current = recognition;

    return () => {
      isStoppingRef.current = true;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log("Recognition already stopped");
        }
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      if (noSpeechTimerRef.current) {
        clearTimeout(noSpeechTimerRef.current);
      }
      isStoppingRef.current = false;
    };
  }, [enabled, wakeWord, onWakeWordDetected, onSpeechRecognized]);

  // Start/stop recognition based on enabled state
  useEffect(() => {
    if (!recognitionRef.current || !isSupported) return;

    if (enabled) {
      isStoppingRef.current = false;
      if (!isRestartingRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.log("Recognition already started");
        }
      }
    } else {
      isStoppingRef.current = true;
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.log("Recognition already stopped");
      }
    }
  }, [enabled, isSupported]);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    
    // Optimized parameters for more natural speech
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0; // Natural pitch
    utterance.volume = 1.0;

    // Get available voices and select the best natural-sounding one
    const voices = window.speechSynthesis.getVoices();
    
    // Priority order for natural voices (higher priority first)
    const voicePriorities = [
      // Premium/Enhanced voices (most natural)
      { keywords: ["Enhanced", "Premium", "Neural"], priority: 10 },
      // Google voices (high quality)
      { keywords: ["Google", "en-US"], priority: 9 },
      { keywords: ["Google"], priority: 8 },
      // Microsoft voices
      { keywords: ["Microsoft", "Natural"], priority: 7 },
      { keywords: ["Microsoft", "Aria", "en-US"], priority: 6.5 },
      { keywords: ["Microsoft", "Jenny", "en-US"], priority: 6.4 },
      { keywords: ["Microsoft", "Guy", "en-US"], priority: 6.3 },
      // Apple/macOS voices
      { keywords: ["Samantha"], priority: 6 },
      { keywords: ["Alex"], priority: 5.5 },
      // General high-quality indicators
      { keywords: ["Natural", "en-US"], priority: 5 },
      { keywords: ["en-US"], priority: 4 },
      // Fallback to local service (often better quality)
      { keywords: [], priority: 1, localService: true },
    ];

    let bestVoice = null;
    let highestPriority = 0;

    for (const voice of voices) {
      const voiceInfo = `${voice.name} (${voice.lang})`;
      
      // Check against each priority rule
      for (const rule of voicePriorities) {
        const matchesKeywords = rule.keywords.length === 0 || 
          rule.keywords.every(keyword => 
            voice.name.includes(keyword) || voice.lang.includes(keyword)
          );
        
        const matchesLocalService = rule.localService === undefined || 
          voice.localService === rule.localService;
        
        if (matchesKeywords && matchesLocalService && rule.priority > highestPriority) {
          highestPriority = rule.priority;
          bestVoice = voice;
          console.log(`🎵 Found better voice: ${voiceInfo} (priority: ${rule.priority})`);
        }
      }
    }

    if (bestVoice) {
      utterance.voice = bestVoice;
      console.log(`✅ Using voice: ${bestVoice.name} (${bestVoice.lang}) - Local: ${bestVoice.localService}`);
    } else if (voices.length > 0) {
      // Fallback: prefer English voices
      const englishVoice = voices.find(v => v.lang.startsWith('en'));
      utterance.voice = englishVoice || voices[0];
      console.log(`⚠️ Using fallback voice: ${utterance.voice?.name}`);
    }

    utterance.onend = () => {
      console.log("Speech synthesis finished");
      onEnd?.();
    };

    utterance.onerror = (event) => {
      // Ignore canceled/interrupted errors - these are expected when stopping speech
      if (event.error === "canceled" || event.error === "interrupted") {
        onEnd?.();
        return;
      }
      console.warn("Speech synthesis error:", event.error);
      onEnd?.();
    };

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const exitVoiceMode = useCallback(() => {
    setIsVoiceMode(false);
    setTranscript("");
    stopSpeaking();
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
  }, [stopSpeaking]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) return;
    try {
      recognitionRef.current.start();
    } catch (e) {
      console.log("Recognition already started");
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    isStoppingRef.current = true;
    try {
      recognitionRef.current.stop();
    } catch (e) {
      console.log("Recognition already stopped");
    }
  }, []);

  return {
    isListening,
    isVoiceMode,
    transcript,
    isSupported,
    speak,
    stopSpeaking,
    exitVoiceMode,
    startListening,
    stopListening,
  };
};
