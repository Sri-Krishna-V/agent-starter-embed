# LiveKit Agent iFrame Embed Starter

## Project Overview  
This is a **Next.js 15 application** that provides a single iFrame embed solution for LiveKit voice agents. The app creates a minimal, embeddable voice assistant interface that external websites can integrate via `<iframe>` tags.

## Key Architecture Patterns

### Next.js App Router Structure
- `app/(app)/` - Main demo page showing embed code and live preview
- `app/(iframe)/embed/` - The embeddable iFrame endpoint (**this is what gets embedded**)
- `app/api/connection-details/` - Token server for LiveKit room access

### LiveKit Integration Flow
1. **Connection**: `hooks/use-connection-details.ts` fetches random room/participant names + access token from `/api/connection-details`
2. **Room Lifecycle**: Each embed instance creates isolated LiveKit rooms with server-generated tokens
3. **Agent Communication**: Uses `@livekit/components-react` hooks (`useVoiceAssistant`, `useRoomContext`) for real-time agent interaction

### Configuration-Driven Customization
- `app-config.ts` exports `APP_CONFIG_DEFAULTS` - **modify this for branding/features**
- Key config: `logo`, `accent`, `startButtonText`, `supportsChatInput`, `supportsVideoInput`
- Environment: requires `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` in `.env.local`

## Critical Development Workflows

### Local Development
```bash
pnpm dev        # Next.js dev server (usually http://localhost:3000)
# Main page shows embed code + live iframe preview
# Test actual embed at: /embed?theme=dark
```

### Component Structure (iFrame-specific)
- `components/embed-iframe/agent-client.tsx` - **Main embed container**
- `components/embed-iframe/welcome-view.tsx` - Pre-connection UI (logo + start button)  
- `components/embed-iframe/session-view.tsx` - Active conversation UI (visualizer + controls)

### Theme System
- CSS custom properties in `styles/globals.css` (--fg0, --bg1, --bgAccent, etc.)
- Theme passed via URL params: `/embed?theme=dark`
- `components/theme-toggle.tsx` persists preference in localStorage

## Critical LiveKit Patterns

### Agent State Management
```typescript
// In session-view.tsx - the core pattern:
const { state: agentState, audioTrack: agentAudioTrack } = useVoiceAssistant();

// Agent states: 'disconnected' | 'connecting' | 'initializing' | 'listening' | 'thinking' | 'speaking'
function isAgentAvailable(agentState: AgentState) {
  return agentState == 'listening' || agentState == 'thinking' || agentState == 'speaking';
}
```

### Control Bar Pattern 
```typescript
// useAgentControlBar hook manages mic/camera/screen share
const { microphoneToggle, handleDisconnect, visibleControls } = useAgentControlBar({
  controls: { microphone: true },  // Only show mic toggle
  saveUserChoices: true,           // Persist device preferences
});
```

### Connection Lifecycle
- `useConnectionDetails()` → `/api/connection-details` → random room + participant token
- Auto-connect when session starts: `room.connect(serverUrl, participantToken)`
- Enable microphone with `preConnectBuffer` for smoother UX

## Development Conventions  
- **TypeScript strict mode** with Next.js 15 app router
- **Tailwind CSS** with custom design tokens (`--fg0`, `--bg1`, etc.)
- **Motion animations** via `motion/react` for state transitions
- **pnpm** for package management  
- **LiveKit Components**: Extend `@livekit/components-react` primitives

## External Integration
```html
<!-- Embed in any website -->
<iframe src="https://your-app.com/embed?theme=dark" 
        style="width: 320px; height: 64px; border: none;">
</iframe>
```

## Common Development Tasks

### UI Customization
```typescript
// app-config.ts - Primary branding/feature config
export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Your Company',
  logo: '/your-logo.svg',
  logoDark: '/your-logo-dark.svg',
  accent: '#your-brand-color',
  startButtonText: 'Talk to Agent',
  supportsChatInput: true,        // Enable chat in popup
  supportsVideoInput: true,       // Show camera toggle
  supportsScreenShare: true,      // Show screen share
  isPreConnectBufferEnabled: true, // Better audio UX
}
```

### Agent Behavior Debugging
```typescript
// Common agent troubleshooting pattern in session components:
useEffect(() => {
  if (!sessionStarted) return;
  
  // 10-second timeout to detect agent connection issues
  const timeout = setTimeout(() => {
    if (!isAgentAvailable(agentState)) {
      const reason = agentState === 'connecting' 
        ? 'Agent did not join the room' 
        : 'Agent connected but did not initialize';
      onDisplayError({ title: 'Session ended', description: reason });
    }
  }, 10_000);
  
  return () => clearTimeout(timeout);
}, [agentState, sessionStarted]);
```

### Theme System Implementation
- **CSS Variables**: `styles/globals.css` defines `--fg0` (darkest text) to `--fg2` (lightest)
- **Dark Mode**: `.dark` class overrides with appropriate dark values
- **Theme Toggle**: `useLocalStorage` + `next-themes` for persistence

## Key Files to Understand

### Core Architecture Files
- `app-config.ts` - **Single source of truth** for UI/branding customization
- `hooks/use-connection-details.ts` - LiveKit room creation and token management
- `hooks/use-agent-control-bar.ts` - Microphone/camera/screenshare control logic
- `app/api/connection-details/route.ts` - Server-side token generation with room isolation

### iFrame Implementation
- `app/(iframe)/embed/page.tsx` - The actual embeddable endpoint
- `components/embed-iframe/agent-client.tsx` - Main container with connection logic
- `components/embed-iframe/session-view.tsx` - Active conversation UI with `BarVisualizer`
- `components/embed-iframe/welcome-view.tsx` - Pre-connection state with start button

### LiveKit Integration Helpers
- `components/livekit/track-toggle.tsx` - Custom mic/camera buttons with persistency
- `components/livekit/device-select.tsx` - Audio/video device picker with styling
- `hooks/use-chat-and-transcription.ts` - Merges agent transcripts with user chat messages

## Environment Setup
```bash
# Required .env.local variables for LiveKit connection:
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your-api-key
LIVEKIT_API_SECRET=your-api-secret

# Development workflow:
pnpm dev        # Auto-reload for iframe changes
# Test at: http://localhost:3000 (main demo)
# Direct iframe: http://localhost:3000/embed?theme=dark
```