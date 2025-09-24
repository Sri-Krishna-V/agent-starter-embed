import type { AppConfig } from './lib/types';

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Your Company',
  pageTitle: 'AI Sales Assistant Embed',
  pageDescription: 'A web embed connected to an AI sales agent, built with LiveKit',

  supportsChatInput: true,
  supportsVideoInput: false, // Disable video for cleaner interface
  supportsScreenShare: false, // Disable screen share for cleaner interface
  isPreConnectBufferEnabled: true,

  logo: '/robot-avatar.svg', // Placeholder robot avatar - to be replaced with company logo
  accent: '#1a1a1a', // Dark button color to match design
  // Commenting out dark theme properties for now
  // logoDark: '/lk-logo-dark.svg',
  // accentDark: '#1fd5f9',
  startButtonText: "Let's Talk",
};
