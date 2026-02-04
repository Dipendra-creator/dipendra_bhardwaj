# 🎤 Voice-Activated Chatbot Testing Guide

## Quick Test Checklist

### 1. Start Development Server
```bash
npm run dev
```

### 2. Open Browser
- Open `http://localhost:3000` in Chrome or Edge
- Grant microphone permission when prompted

### 3. Test Wake Word Detection
1. Don't click anything
2. Say clearly: **"Hey Dipendra"**
3. Expected result:
   - ✅ Chatbot opens automatically
   - ✅ Voice mode banner appears at top
   - ✅ Greeting message plays via voice
   - ✅ "Voice Active" badge shows in header

### 4. Test Voice Conversation
1. After wake word activation, ask a question:
   - Example: "What projects have you worked on?"
2. Wait for AI response
3. Expected result:
   - ✅ Your speech is transcribed
   - ✅ Message appears in chat
   - ✅ AI responds with text AND voice
   - ✅ No interruptions during AI speech

### 5. Test Multiple Questions
1. After AI finishes speaking, ask another question
2. Continue conversation naturally
3. Expected result:
   - ✅ System waits for you to finish (1.5s pause)
   - ✅ Each response is spoken aloud
   - ✅ Transcript updates in real-time

### 6. Test Manual Toggle
1. Click microphone icon in chat header
2. Expected result:
   - ✅ Voice mode toggles on/off
   - ✅ Icon changes (microphone/muted)
   - ✅ Can switch back to text mode

### 7. Test Close & Reopen
1. Close chatbot while voice mode active
2. Say "Hey Dipendra" again
3. Expected result:
   - ✅ Chatbot reopens
   - ✅ Voice mode reactivates
   - ✅ Continues working normally

## Visual Indicators to Look For

### When System is Ready:
```
┌─────────────────────────────┐
│  Bottom Right:              │
│  🎤 "Say 'Hey Dipendra'"   │
│  (with green pulse)         │
└─────────────────────────────┘
```

### When Voice Mode Active:
```
┌─────────────────────────────────────┐
│  Top Center (Purple Banner):       │
│  🎤 Voice Mode Active               │
│  "what projects have you..."        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Chat Header:                       │
│  Chat with Dipendra [Voice Active] │
│  🎤 [X]                             │
└─────────────────────────────────────┘
```

## Expected Behavior Timeline

```
Time    User Action              System Response
─────────────────────────────────────────────────────────
0:00    Page loads               ✅ Start listening for wake word
0:05    Says "Hey Dipendra"      ✅ Open chat + play greeting
0:10    Says "What do you do?"   ✅ Show transcript
0:13    (1.5s silence)           ✅ Process question
0:14    AI responds              ✅ Show text + speak aloud
0:20    Says next question       ✅ Cycle repeats
```

## Common Issues & Solutions

### Issue: Wake word not working
**Solution:**
- Check console for microphone permissions
- Verify "Say 'Hey Dipendra'" indicator is visible
- Try saying it slower and clearer
- Check browser is Chrome/Edge

### Issue: No voice response
**Solution:**
- Ensure system audio is not muted
- Check browser console for errors
- Click anywhere on page first (autoplay policy)
- Try refreshing the page

### Issue: Transcript not showing
**Solution:**
- Verify microphone is working (check browser settings)
- Speak louder and clearer
- Check if voice mode banner is visible
- Try disabling and re-enabling voice mode

### Issue: AI interrupts while speaking
**Solution:**
- Wait for full 1.5 seconds of silence
- Speak continuously without long pauses
- If needed, adjust silence threshold in code

## Browser Console Tests

Open Developer Console (F12) and look for these logs:

```javascript
// Expected successful flow:
✅ "Speech recognition started"
✅ "Wake word detected!"
✅ "User finished speaking: what do you do"
✅ "Processing user speech: what do you do"
✅ "Speech synthesis finished"
```

## Performance Metrics

Expected timings:
- Wake word detection: < 500ms
- Speech recognition: Real-time
- Silence detection: 1.5 seconds
- API response: 1-3 seconds
- Voice synthesis start: < 500ms

## Testing Different Scenarios

### Scenario 1: Quick Questions
- Ask short questions rapidly
- System should handle each separately

### Scenario 2: Long Questions
- Ask complex, multi-sentence questions
- System should wait until you finish

### Scenario 3: Background Noise
- Test with moderate background sound
- Should still detect clear speech

### Scenario 4: Multiple Tabs
- Open multiple tabs with site
- Each should have independent voice system

### Scenario 5: Mobile Testing
- Test on mobile browsers
- Voice features should work (Chrome mobile)

## Success Criteria

✅ **System is working correctly if:**
1. Wake word activates chatbot without clicking
2. Voice mode indicator is clearly visible
3. Speech is accurately transcribed
4. AI responds with both text and voice
5. No interruptions during AI speech
6. Can have multi-turn conversation
7. Visual feedback is clear and responsive
8. Manual toggle works correctly
9. Can exit and re-enter voice mode
10. No console errors or warnings

## Production Testing

Before deploying:
1. ✅ Test on HTTPS domain (microphone requires secure context)
2. ✅ Test with different browsers
3. ✅ Test microphone permission flow
4. ✅ Test error handling (deny permissions)
5. ✅ Test on mobile devices
6. ✅ Verify environment variables set
7. ✅ Check API rate limits
8. ✅ Test with slow internet connection

## Demo Script for Showing Others

```
"Watch this - I don't need to click anything."

[Say] "Hey Dipendra"

[Chat opens automatically]

"See? It opened on its own. Now I can just talk."

[Say] "What technologies do you work with?"

[AI responds with voice]

"It responds with voice automatically. Let me ask another question."

[Say] "Tell me about your projects"

[AI responds again]

"Completely hands-free conversation!"
```

---

## Need Help?

Check the console for detailed logs and error messages.

All speech-related logs are prefixed with emojis:
- 🎤 Speech recognition events
- 🔊 Speech synthesis events
- 👂 Wake word detection
- 💬 Chat processing
