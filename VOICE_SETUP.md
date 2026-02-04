# Voice-Activated AI Chatbot - Setup Guide

## 🎙️ Overview

Your portfolio now features a complete voice-activated AI chatbot system! Users can interact with your chatbot using voice commands without any clicks.

## ✨ Features

### 1. **Wake Word Activation**
- Say **"Hey Dipendra"** anywhere on your website to activate voice mode
- No buttons to click - completely hands-free
- Works even when chatbot window is closed

### 2. **Smart Speech Recognition**
- Continuous listening for user input
- Automatically detects when user finishes speaking (1.5s silence threshold)
- Handles interruptions gracefully
- Supports natural conversation flow

### 3. **Voice Responses**
- AI responds with natural voice using browser's built-in TTS
- No external API costs - completely free
- Automatically selects best available voice
- Clear, natural speech synthesis

### 4. **Visual Feedback**
- **Bottom-right indicator**: Shows when system is listening for "Hey Dipendra"
- **Top-center banner**: Displays when voice mode is active
- **Live transcript**: Shows what you're saying in real-time
- **Pulsing animations**: Indicates active listening state

### 5. **Browser Compatibility**
- ✅ Chrome/Edge (Best support)
- ✅ Safari (Good support)
- ⚠️ Firefox (Limited support)

## 🚀 How It Works

### User Flow:
1. User visits your website
2. Voice system automatically starts listening for wake word
3. User says "Hey Dipendra"
4. Chatbot opens and greets user with voice
5. User asks question (speaks naturally)
6. System detects end of speech (1.5s silence)
7. AI processes and responds with voice
8. Conversation continues hands-free

### Technical Architecture:
```
┌─────────────────────────────────────────────────────┐
│  Web Speech API (Browser Built-in - 100% Free)     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────┐      ┌──────────────────┐   │
│  │ Speech Recognition│ ──▶  │ Wake Word Filter │   │
│  │  (Continuous)    │      │  "Hey Dipendra"  │   │
│  └──────────────────┘      └──────────────────┘   │
│           │                         │              │
│           ▼                         ▼              │
│  ┌──────────────────┐      ┌──────────────────┐   │
│  │  User Speech     │ ──▶  │  Kilo AI API     │   │
│  │  Transcription   │      │  (Free Model)    │   │
│  └──────────────────┘      └──────────────────┘   │
│                                     │              │
│                                     ▼              │
│                            ┌──────────────────┐   │
│                            │ Speech Synthesis │   │
│                            │   (Voice Reply)  │   │
│                            └──────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## 🛠️ Implementation Details

### Files Created:
1. **`src/hooks/useVoiceActivation.ts`** - Core voice logic
   - Wake word detection
   - Speech recognition management
   - Text-to-speech handling
   - State management

2. **`src/components/Chatbot.tsx`** - Updated UI
   - Voice mode integration
   - Visual indicators
   - Voice/text mode switching

### Key Technologies:
- **Web Speech API**: Free, browser-native speech recognition & synthesis
- **SpeechRecognition**: Continuous listening with interim results
- **SpeechSynthesis**: Natural voice output
- **React Hooks**: State management and lifecycle handling

## 📋 Usage Instructions

### For Users:
1. **Activate Voice Mode**: Say "Hey Dipendra"
2. **Ask Your Question**: Speak naturally, pause when done
3. **Listen to Response**: AI will reply with voice
4. **Continue Conversation**: Keep asking questions
5. **Exit Voice Mode**: Click the microphone icon or close chat

### For Developers:

#### Customize Wake Word:
```tsx
// In Chatbot.tsx, change the wake word
const { ... } = useVoiceActivation({
  wakeWord: "hey dipendra", // Change this
  ...
});
```

#### Adjust Speech Detection Timing:
```tsx
// In useVoiceActivation.ts, line ~75
silenceTimerRef.current = setTimeout(() => {
  // Process speech
}, 1500); // Change this value (milliseconds)
```

#### Change Voice Settings:
```tsx
// In useVoiceActivation.ts, speak function
utterance.rate = 1.0;  // Speed (0.1 - 10)
utterance.pitch = 1.0; // Pitch (0 - 2)
utterance.volume = 1.0; // Volume (0 - 1)
```

## 🎯 Best Practices

### For Optimal Performance:
1. **Use Chrome or Edge** for best speech recognition
2. **Speak clearly** with minimal background noise
3. **Wait for response** before asking next question
4. **Grant microphone permission** when prompted
5. **Use HTTPS** (required for microphone access)

### For Development:
1. Test in different browsers
2. Handle permission denials gracefully
3. Add error boundaries
4. Consider fallback for unsupported browsers
5. Test with various accents and speaking speeds

## 🔧 Troubleshooting

### "Microphone not working"
- Check browser permissions
- Ensure HTTPS connection
- Try reloading the page
- Check browser console for errors

### "Wake word not detected"
- Speak clearly: "Hey Dipendra"
- Check microphone is active (indicator should show)
- Verify voice is enabled (microphone icon in chat)
- Try different browsers

### "No voice response"
- Check browser supports Speech Synthesis
- Verify system audio is not muted
- Try clicking somewhere on page first (browser autoplay policy)

## 🔒 Privacy & Security

- **No audio recording**: Audio is processed in browser, not stored
- **No external services**: Web Speech API is browser-native
- **User control**: Easy to disable voice features
- **Permission-based**: Requires explicit microphone access

## 🚀 Deployment Notes

### Environment Variables Required:
```bash
KILO_API_KEY=your_kilo_api_key_here
```

### HTTPS Required:
- Microphone access requires secure context
- Use Vercel, Netlify, or similar for automatic HTTPS
- Local development: use `localhost` (treated as secure)

### Browser Support:
- Add feature detection
- Provide fallback UI for unsupported browsers
- Show clear messaging about requirements

## 📈 Future Enhancements

Possible improvements:
- [ ] Multi-language support
- [ ] Custom voice selection
- [ ] Conversation history persistence
- [ ] Voice command shortcuts
- [ ] Noise cancellation
- [ ] Offline support with local models
- [ ] Mobile app integration

## 🎉 Success Indicators

The system is working when you see:
1. ✅ "Say 'Hey Dipendra'" indicator in bottom-right
2. ✅ Green pulse animation when listening
3. ✅ Voice mode banner appears when activated
4. ✅ Real-time transcript shows your speech
5. ✅ AI responds with voice automatically

---

**Built with ❤️ using Web Speech API and Kilo AI**

Completely free, no external API costs for voice features!
