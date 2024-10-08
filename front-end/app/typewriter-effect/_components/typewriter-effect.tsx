'use client';

import React from 'react';

const displayName = 'TypewriterEffect';

const words = [
  'Accessibility',
  'Internationalization',
  'Cross-Device Compatibility',
  'Multiple Themes (Light/Dark)',
  'Performance Optimization',
  'SEO Excellence',
];

const typingSpeedInterval = 100;
const deleteSpeedInterval = 30;
const delayBetweenNextWord = 0;
const waitBeforeDeleteWord = 3000;

export const TypewriterEffect = () => {
  const [isCursorBlinking, setIsCursorBlinking] =
    React.useState(true);

  const [textContent, setTextContent] = React.useState('');

  const wordIndexRef = React.useRef(0);
  const charIndexRef = React.useRef(0);
  const typeTimerRef = React.useRef<NodeJS.Timeout | undefined>();
  const deleteTimerRef = React.useRef<NodeJS.Timeout | undefined>();

  React.useEffect(() => {
    const typewriter = (
      operation: 'insert' | 'delete' = 'insert',
    ) => {
      const currentWord = words[wordIndexRef.current];

      if (operation === 'delete') {
        clearTimeout(deleteTimerRef.current);

        if (charIndexRef.current === 0) {
          if (wordIndexRef.current + 1 === words.length)
            wordIndexRef.current = 0;
          else wordIndexRef.current += 1;

          charIndexRef.current = 0;

          typeTimerRef.current = setTimeout(
            typewriter,
            delayBetweenNextWord,
          );

          return;
        }

        setIsCursorBlinking(false);

        charIndexRef.current--;

        setTextContent(currentWord.slice(0, charIndexRef.current));

        deleteTimerRef.current = setTimeout(() => {
          typewriter('delete');
        }, deleteSpeedInterval);
        return;
      }

      if (charIndexRef.current < currentWord.length + 1) {
        clearTimeout(typeTimerRef.current);

        setIsCursorBlinking(false);

        setTextContent(currentWord.slice(0, charIndexRef.current));

        charIndexRef.current += 1;

        typeTimerRef.current = setTimeout(
          typewriter,
          typingSpeedInterval,
        );
      } else {
        setIsCursorBlinking(true);

        deleteTimerRef.current = setTimeout(() => {
          typewriter('delete');
        }, waitBeforeDeleteWord);
      }
    };

    typewriter();

    return () => {
      clearTimeout(typeTimerRef.current);
    };
  }, []);

  return (
    <p className="min-h-24 text-balance text-center text-3xl">
      {textContent}

      <span
        data-blink={isCursorBlinking}
        className="bg-info-9 data-[blink=true]:animate-blink-cursor ml-1 inline-block w-1 whitespace-pre rounded-full [--cursor-blinking-duration:1s] before:content-['_']"
      />
    </p>
  );
};

TypewriterEffect.displayName = displayName;
