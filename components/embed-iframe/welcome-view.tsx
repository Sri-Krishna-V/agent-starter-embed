import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { APP_CONFIG_DEFAULTS } from '@/app-config';

type WelcomeViewProps = {
  disabled: boolean;
  onStartCall: () => void;
};

export const WelcomeView = ({
  disabled,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('us');

  return (
    /* 
     * IFRAME CONSTRAINTS: 385px x 85px (more spacious!)
     * - Total available height: 85px (+21px from previous)
     * - Total available width: 385px (+65px from previous)
     * - More comfortable spacing and sizing possible
     * - Can use slightly larger elements and padding
     */
    <div ref={ref} inert={disabled} className="absolute inset-0 bg-white">
      <div className="flex h-full items-center justify-between px-4 py-3">
        {/* 
         * LEFT SECTION: Avatar + Text (takes ~60% of width)
         * Height: Full 85px available (+21px more space!)
         * Width: ~230px of 385px (+30px more space!)
         */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            {/* 
             * AVATAR SIZING GUIDE (Updated for 85px height):
             * - size-8 (32px): Good for 85px height
             * - size-10 (40px): Better fit with extra space
             * - size-12 (48px): Maximum size, very prominent
             */}
            <img 
              src={APP_CONFIG_DEFAULTS.logo}
              alt="AI Assistant Avatar" 
              className="size-5 rounded-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            {/* 
             * TEXT SIZING GUIDE (Updated for 85px height):
             * - text-sm (14px): Still good, more breathing room
             * - text-base (16px): Now feasible with extra height
             * - text-lg (18px): Possible but might be too large
             * - leading-tight: Still important for clean look
             */}
            <p className="text-base font-medium text-gray-800 leading-tight truncate">
              Want to close more deals?
            </p>
          </div>
        </div>

        {/* 
         * RIGHT SECTION: Button + Language Selector (takes ~40% of width) 
         * Height: Must fit in 85px with padding (+21px more space!)
         * Width: ~155px of 385px (+35px more space!)
         */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* 
           * BUTTON SIZING GUIDE (Updated for 85px height iframe):
           * Height options:
           * - py-1.5 (12px total): Compact, ~36px button height
           * - py-2 (16px total): Medium, ~40px button height - Good choice now!
           * - py-2.5 (20px total): Comfortable, ~44px button height
           * - py-3 (24px total): Spacious, ~48px button height - Now possible!
           * 
           * Width options:
           * - px-4: Standard horizontal padding
           * - px-5: More comfortable padding
           * - px-6: Spacious (now more feasible)
           */}
          <Button 
            onClick={onStartCall}
            className="px-5 py-2 rounded-full text-sm font-medium transition-colors hover:shadow-sm"
            style={{
              backgroundColor: '#1f2937',
              color: '#ffffff',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#111827';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1f2937';
            }}
          >
            <span className="mr-1">📞</span>
            {APP_CONFIG_DEFAULTS.startButtonText}
          </Button>

          {/* 
           * LANGUAGE SELECTOR SIZING GUIDE (Updated for 85px height):
           * Height: Should match button height (~40px with py-2)
           * Width: Can be slightly larger with extra space (~50px)
           * 
           * Size adjustments:
           * - px-3 py-2: Matches new button height
           * - text-sm: Larger text now feasible
           * - pr-7: More space for dropdown arrow
           */}
          <div className="relative">
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="appearance-none bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-3 py-2 pr-7 rounded-full border-0 outline-none cursor-pointer transition-colors"
            >
              <option value="us">🇺🇸 US</option>
              <option value="hi">🇮🇳 HI</option>
            </select>
            <svg 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
