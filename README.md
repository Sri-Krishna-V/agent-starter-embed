<img src="./.github/assets/app-icon.png" alt="AI Sales Assistant App Icon" width="100" height="100">

# AI Sales Assistant iFrame Embed

This is a customized AI sales assistant embed built on the [LiveKit Agents](https://docs.livekit.io/agents) starter template. It provides a compact, embeddable widget for websites that allows visitors to start voice conversations with an AI sales agent.

## Key Features

- **Compact Widget Design**: Horizontal layout optimized for embedding in any website
- **Light Theme Only**: Clean, professional appearance focused on light theme
- **Multi-language Support**: Currently supports English (us) and Hindi (hi) 
- **Voice-First Experience**: Optimized for voice conversations with visual feedback
- **Customizable Branding**: Easy to replace robot avatar with company logo
- **Responsive Design**: Works seamlessly across different screen sizes

This template is built with Next.js and is free for you to use or modify as you see fit.

![App screenshot](/.github/assets/frontend-screenshot.png)

## Getting started

> [!TIP]
> If you'd like to try this application without modification, you can deploy an instance in just a few clicks with [LiveKit Cloud Sandbox](https://cloud.livekit.io/projects/p_/sandbox/templates/embed).

Run the following command to automatically clone this template.

```bash
lk app create --template agent-starter-embed
```

Then run the app with:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 in your browser to experience the iFrame embed demo.

You'll also need an agent to speak with. Try our starter agent for [Python](https://github.com/livekit-examples/agent-starter-python), [Node.js](https://github.com/livekit-examples/agent-starter-node), or [create your own from scratch](https://docs.livekit.io/agents/start/voice-ai/).

> [!NOTE]
> If you need to modify the LiveKit project credentials used, you can edit `.env.local` (copy from `.env.example` if you don't have one) to suit your needs.

## Customization

### Replacing the Robot Avatar
The current implementation uses a placeholder robot avatar (`/robot-avatar.svg`). To customize:

1. Replace `/public/robot-avatar.svg` with your company logo
2. Update the `logo` path in `app-config.ts`
3. Ensure your logo is optimized for a 32x32px display size

### Language Configuration
Currently supports two languages:
- **English (us)**: Default option
- **Hindi (hi)**: Secondary option

To modify language options, edit the `<select>` element in `components/embed-iframe/welcome-view.tsx`.

### Styling Customization
The widget uses a light-theme-only design. Key styling files:
- `app-config.ts`: Primary configuration (colors, text, branding)
- `components/embed-iframe/welcome-view.tsx`: Welcome screen layout
- `components/embed-iframe/agent-client.tsx`: Main container styling
- `styles/globals.css`: Global theme variables (dark theme commented out)

### Theme Configuration
Dark theme is currently disabled to maintain consistency. If you need to re-enable it:
1. Uncomment dark theme styles in `styles/globals.css`
2. Update `theme-provider.tsx` to allow theme switching
3. Test all components for dark theme compatibility

## Local Development

<http://localhost:3001> will respond to code changes in real time through [NextJS Fast Refresh](https://nextjs.org/docs/architecture/fast-refresh) to support a rapid iteration feedback loop.

The embed can be accessed directly at: `http://localhost:3001/embed`

## Embedding in Your Website

```html
<iframe 
  src="https://your-domain.com/embed" 
  width="320" 
  height="64" 
  frameborder="0"
  style="border: none; border-radius: 16px;">
</iframe>
```

## Contributing

This template is open source and we welcome contributions! Please open a PR or issue through GitHub, and don't forget to join us in the [LiveKit Community Slack](https://livekit.io/join-slack)!
