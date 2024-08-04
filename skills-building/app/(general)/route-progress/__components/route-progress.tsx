'use client';

import React from 'react';

interface RouteProgressProps {}

const displayName = 'RouteProgress';

export const RouteProgress = (props: RouteProgressProps) => {
  const {} = props;

  const end_cancelRef = React.useRef(0);
  const start_cancelRef = React.useRef(0);

  const [progress, setProgress] = React.useState(0);

  const end = React.useCallback(() => {
    const speed = 1;

    const updateProgress = () => {
      setProgress((prevProgress) => {
        if (prevProgress + speed > 100) {
          cancelAnimationFrame(end_cancelRef.current);
          return 100;
        }

        end_cancelRef.current = requestAnimationFrame(updateProgress);

        return prevProgress + speed;
      });
    };

    updateProgress();
  }, []);

  const start = React.useCallback(() => {
    let prevProgress = 0;

    const updateProgress = () => {
      if (prevProgress < 10) {
        prevProgress += 0.5; // Fast speed
      } else if (prevProgress < 20) {
        prevProgress += 2; // Fast speed
      } else if (prevProgress < 30) {
        prevProgress += 1; // Normal speed
      } else if (prevProgress < 50) {
        prevProgress += 0.5; // Slow speed
      } else if (prevProgress < 80) {
        prevProgress += 2; // Fast speed
      } else {
        // at 80%
        cancelAnimationFrame(start_cancelRef.current);
        return;
      }

      setProgress(prevProgress);

      start_cancelRef.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();
  }, []);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLAnchorElement)) return;

      start();
    };

    window.addEventListener('click', handleClick);

    ((history: History): void => {
      const pushState = history.pushState;
      history.pushState = (...args) => {
        end();
        return pushState.apply(history, args);
      };
    })((window as Window).history);

    ((history: History): void => {
      const replaceState = history.replaceState;
      history.replaceState = (...args) => {
        end();
        return replaceState.apply(history, args);
      };
    })((window as Window).history);

    const handleBackAndForth = () => {
      // setProgress(0);
    };

    window.addEventListener('popstate', handleBackAndForth);
    window.addEventListener('pushstate', handleBackAndForth);

    return () => {
      window.removeEventListener('popstate', handleBackAndForth);
      window.removeEventListener('pushstate', handleBackAndForth);
    };
  }, [end, start]);

  return progress && progress === 100 ? null : (
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
