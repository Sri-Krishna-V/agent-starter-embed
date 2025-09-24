'use client';

import { useMemo, useState } from 'react';
import { THEME_STORAGE_KEY } from '@/lib/env';
import type { ThemeMode } from '@/lib/types';
import { ThemeToggle } from './theme-toggle';

export default function Welcome() {
  const [, forceUpdate] = useState(0);
  const theme = (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode) ?? 'dark';

  const embedUrl = useMemo(() => {
    const url = new URL('/embed', window.location.origin);
    url.searchParams.set('theme', theme);
    return url.toString();
  }, [theme]);

  return (
    <div className="text-fg1 mx-auto flex min-h-screen max-w-prose flex-col justify-center py-4 md:py-20">
      <div className="h-[520px] space-y-10 px-4">
        <div className="items-top flex justify-between">
          <h1 className="text-fg0 text-2xl font-bold text-pretty">LiveKit Agent iFrame Embed</h1>
          <div className="mt-1">
            <div className="sr-only">Toggle theme:</div>
            <ThemeToggle className="w-auto" onClick={() => forceUpdate((c) => c + 1)} />
          </div>
        </div>

        <p>
          The embed agent starter example is a low-code solution to embed a LiveKit Agent into an
          existing website or web application using an iFrame.
        </p>

        <div>
          <h3 className="text-fg0 mb-1 font-semibold text-lg">iFrame Embed</h3>
          <div>
            <h4 className="text-fg0 mb-1 font-semibold">Embed code</h4>
            <pre className="border-separator2 bg-bg2 overflow-auto rounded-md border px-2 py-1">
              <code className="font-mono">
                {`<iframe\n  src="`}
                <a
                  href={embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {embedUrl}
                </a>
                {`"\n  style="width: 382px; height: 85px;"\n></iframe>`}
              </code>
            </pre>
          </div>
          <div className="flex justify-center mt-6">
            <iframe
              src={embedUrl}
              style={{ width: 385, height: 1000 }}
              className="opacity-100 transition-opacity duration-500 [@starting-style]:opacity-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
