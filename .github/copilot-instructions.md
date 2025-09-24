# LiveKit Agent iFrame Embed Starter - AI Coding Instructions

## Project Overview
This is a **Next.js application** that provides an iFrame embed solution to embed LiveKit voice agents into external websites:
1. **iFrame embed** (`/embed`) - Server-rendered iframe for easy integration

## Key Architecture Patterns

### Build System
- **Next.js** builds the main app and iframe embed (`pnpm dev`, `pnpm build`)

### Configuration System
- `app-config.ts` defines default UI/branding settings via `APP_CONFIG_DEFAULTS`
- Runtime config fetched from `CONFIG_ENDPOINT` with sandbox support
- `lib/env.ts` handles environment-based config resolution
- Config affects both embed variants uniformly

### Route Groups Pattern
- `app/(app)/` - Main demo/documentation pages
- `app/(iframe)/embed/` - iFrame embed endpoint 
- `app/api/connection-details/` - LiveKit room/token generation

### LiveKit Integration
- `hooks/use-connection-details.ts` manages room connection lifecycle
- Each session creates random room/participant names for isolation
- Access tokens generated server-side with required LiveKit permissions
- Environment variables: `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`

## Critical Development Workflows

### Testing iFrame Locally
```bash
pnpm dev                        # Start Next.js dev server
# Test iframe: http://localhost:3000
```

### Production Deployment
- iFrame embed updates automatically with Next.js deployment

## Component Architecture

### Embed Components Structure
- `components/embed-iframe/agent-client.tsx` - Main iframe embed logic

### Theme System
- `components/theme-toggle.tsx` with `ApplyThemeScript` for SSR theme consistency
- Theme preference persisted in localStorage with `THEME_STORAGE_KEY`
- CSS custom properties in `styles/globals.css` support light/dark modes
- Iframe embed receives theme via URL params

### State Management
- Room connection state managed in individual embed components
- No global state management - each embed instance is independent
- `useConnectionDetails` hook abstracts connection lifecycle

## Integration Points

### External Website Integration
**iFrame approach:**
```html
<iframe src="https://yourapp.com/embed?theme=dark" width="400" height="600"></iframe>
```

### Environment Setup
- Copy `.env.example` to `.env.local` for local development
- Production requires LiveKit Cloud project credentials
- Sandbox deployments use `SANDBOX_ID` for config isolation

## Development Conventions
- TypeScript strict mode with Next.js 15 app router
- Tailwind CSS with custom design system (see `components/ui/`)
- `@livekit/components-react` for voice/video UI primitives
- Motion animations via Framer Motion (`motion/react`)
- pnpm for package management

## LiveKit Agent Integration Patterns

### Agent State Management
- **Voice Assistant Hook**: `useVoiceAssistant()` provides agent state (`listening`, `thinking`, `speaking`)
- **Agent Availability**: Use `isAgentAvailable(agentState)` to check if agent can respond
- **Audio Visualization**: `BarVisualizer` component shows real-time audio levels from agent
- **Track References**: Agent audio track accessed via `audioTrack` from `useVoiceAssistant()`

### Room Connection Lifecycle
```typescript
// Connection flow in hooks/use-connection-details.ts
1. Generate random room/participant names for isolation
2. Fetch access token from /api/connection-details
3. Connect to LiveKit room with token
4. Handle reconnection on disconnect
```

### Agent Control Patterns
- **Control Bar Hook**: `useAgentControlBar()` manages microphone, camera, screen share toggles
- **Device Management**: Persistent user choices for audio/video devices via `usePersistentUserChoices`
- **Permission System**: `usePublishPermissions()` controls which features are available
- **Track Toggles**: `useTrackToggle()` for mic/camera with error handling

### Chat & Transcription Integration
- **Combined Messages**: `useChatAndTranscription()` merges agent transcriptions with user chat
- **Real-time Updates**: Transcriptions automatically converted to chat messages
- **Message Sorting**: Combined messages sorted by timestamp for proper conversation flow

## UI Customization & Design System

### Configuration-Based Customization
**Primary Config**: Modify `app-config.ts` for basic branding:
```typescript
export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Your Company',
  pageTitle: 'Your Voice Assistant',
  logo: '/your-logo.svg',
  logoDark: '/your-logo-dark.svg',
  accent: '#your-primary-color',
  accentDark: '#your-dark-mode-color',
  startButtonText: 'Talk to Assistant',
  // Feature toggles
  supportsChatInput: true,
  supportsVideoInput: false,
  supportsScreenShare: false,
}
```

### Theme System Architecture
**CSS Custom Properties**: `styles/globals.css` defines comprehensive design tokens:
```css
:root {
  --fg0, --fg1, --fg2: /* Text colors (darkest to lightest) */
  --bg1, --bg2, --bg3: /* Background layers */
  --fgAccent, --bgAccent: /* Accent colors */
  --separator1, --separator2: /* Border colors */
  --radius: /* Border radius */
}
.dark { /* Dark mode overrides */ }
```

**Theme Toggle**: `ThemeToggle` component with `ApplyThemeScript` prevents flash
- Theme persisted in localStorage with `THEME_STORAGE_KEY`
- iframe embeds receive theme via URL parameter
- Both embed variants share the same theme system

### Component Customization Patterns

**Button System**: `components/ui/button.tsx` uses class-variance-authority:
```typescript
buttonVariants = cva(baseClasses, {
  variants: {
    variant: { default, primary, destructive, outline, ghost },
    size: { default, sm, lg, icon }
  }
})
```

**LiveKit Component Overrides**: Extend `@livekit/components-react`:
- `components/livekit/avatar-tile.tsx` - Custom video rendering
- `components/livekit/device-select.tsx` - Styled device picker
- `components/livekit/track-toggle.tsx` - Custom mic/camera buttons

### Layout Customization

**Session View Structure**: `components/embed-iframe/session-view.tsx`:
```tsx
// Main layout areas you can customize:
1. Agent avatar/video area (top)
2. Visualizer area (center) - BarVisualizer component
3. Control bar (bottom) - mic toggle, device select, disconnect
4. Chat panel (conditional) - if supportsChatInput enabled
```

**Welcome View**: `components/embed-iframe/welcome-view.tsx`:
- Logo display area
- Start button with custom text
- Company branding
- Feature descriptions

### Advanced Styling Approaches

**CSS Scope**: iFrame embed uses standard CSS cascade

**Motion Animations**: Framer Motion (`motion/react`) used throughout:
- Page transitions between welcome/session views
- Button hover effects
- Tab switching animations

**Responsive Design**: Tailwind breakpoints used consistently:
- Mobile-first approach
- Desktop enhancements at `md:` breakpoint
- Touch-friendly sizing on mobile

## Common Customization Tasks

### UI Branding Changes
1. **Logo/Colors**: Update `app-config.ts` and add logo files to `public/`
2. **Typography**: Modify font imports in `styles/globals.css` or add to `fonts/`
3. **Color Scheme**: Adjust CSS custom properties in `:root` and `.dark` selectors
4. **Button Styles**: Extend `buttonVariants` in `components/ui/button.tsx`

### Feature Modifications
1. **Add Controls**: Extend `ControlBarControls` interface and `useAgentControlBar`
2. **Custom Layouts**: Modify session-view layout structure
3. **Agent Behavior**: Adjust agent state handling in embed components
4. **Connection Logic**: Edit `app/api/connection-details/route.ts` for custom room logic

### Build & Deploy Workflow
```bash
# Development cycle
pnpm dev                        # Start Next.js dev server
# Make iframe changes -> auto-reload

# Production deployment
pnpm build                      # Build Next.js app
```