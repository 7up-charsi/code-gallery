'use client';

import React from 'react';

interface RouteProgressProps {}

const displayName = 'RouteProgress';

export const RouteProgress = (props: RouteProgressProps) => {
  const {} = props;

  const progressRef = React.useRef(0);

  const [progress, setProgress] = React.useState(0);
  const [hide, setHide] = React.useState(true);

  React.useEffect(() => {
    let doneAnimationFrame = 0;
    let startAnimationFrame = 0;

    const stop = () => {
      cancelAnimationFrame(doneAnimationFrame);
      cancelAnimationFrame(startAnimationFrame);

      progressRef.current = 0;
      setHide(true);
      setProgress(0);
    };

    const done = () => {
      cancelAnimationFrame(startAnimationFrame);

      const speed = 3;

      const updateProgress = () => {
        const currProgress = progressRef.current;

        if (currProgress > 100) {
          cancelAnimationFrame(doneAnimationFrame);
          setHide(true);
          return;
        }

        const nextProgress = currProgress + speed;

        progressRef.current = nextProgress;
        setProgress(Math.min(100, nextProgress));

        doneAnimationFrame = requestAnimationFrame(updateProgress);
      };

      updateProgress();
    };

    const start = () => {
      cancelAnimationFrame(startAnimationFrame);

      progressRef.current = 0;

      let speed = 0;

      const updateProgress = () => {
        const currProgress = progressRef.current;

        if (currProgress < 10) {
          speed = 0.5; // Fast speed
        } else if (currProgress < 20) {
          speed = 2; // Fast speed
        } else if (currProgress < 30) {
          speed = 1; // Normal speed
        } else if (currProgress < 50) {
          speed = 0.5; // Slow speed
        } else if (currProgress < 80) {
          speed = 2; // Fast speed
        } else {
          // at 80%
          cancelAnimationFrame(startAnimationFrame);
          return;
        }

        const nextProgress = currProgress + speed;

        progressRef.current = nextProgress;
        setProgress(nextProgress);
        setHide(false);

        startAnimationFrame = requestAnimationFrame(updateProgress);
      };

      updateProgress();
    };

    // Wrap history methods to complete progress on adding new entry or  replacing current entry of history stack
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const originalHistory = window.history;

    window.history.pushState = function (...args) {
      done();
      originalPushState.apply(originalHistory, args);
    };

    window.history.replaceState = function (...args) {
      done();
      originalReplaceState.apply(originalHistory, args);
    };

    const handleClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');

        if (anchor) {
          const currUrl = new URL(window.location.href);
          const newUrl = new URL(anchor.href);

          const isExternalLink = anchor.target === '_blank';

          // Check for Special Schemes
          const isSpecialScheme = [
            'tel:',
            'mailto:',
            'sms:',
            'blob:',
            'download:',
          ].some((scheme) => newUrl.toString().startsWith(scheme));

          if (
            isExternalLink ||
            isSpecialScheme ||
            e.ctrlKey ||
            e.metaKey ||
            e.shiftKey ||
            e.altKey
          )
            return;

          if (currUrl.hostname !== newUrl.hostname) return;
          if (
            currUrl.pathname === newUrl.pathname &&
            currUrl.search === newUrl.search &&
            currUrl.hash !== newUrl.hash
          )
            return;

          if (
            currUrl.pathname === newUrl.pathname &&
            currUrl.search === newUrl.search &&
            currUrl.hash === newUrl.hash
          )
            return;

          start();
        }
      } catch (err) {
        done();
      }
    };

    const handlePageHide = () => {
      stop();
    };

    const handleBackAndForth = () => {
      start();
    };

    // Add the global click event listener
    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handleBackAndForth);
    window.addEventListener('pagehide', handlePageHide);

    // Clean up the global click event listener when the component is unmounted
    return (): void => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handleBackAndForth);
      window.removeEventListener('pagehide', handlePageHide);

      cancelAnimationFrame(doneAnimationFrame);
      cancelAnimationFrame(startAnimationFrame);
    };
  }, []);

  return hide ? null : (
    <div className="fixed left-0 right-0 top-0 z-50 h-1">
      <div
        style={{
          clipPath: `inset(0 ${100 - progress}% 0 0)`,
        }}
        className="h-full w-full bg-gradient-to-r from-primary-9 to-secondary-9"
      ></div>
    </div>
  );
};

RouteProgress.displayName = displayName;
