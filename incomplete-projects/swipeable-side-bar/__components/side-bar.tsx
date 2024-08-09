'use client';

import { useSwipeable } from '@typeweave/react/use-swipeable';
import React from 'react';

interface SideBarProps {}

const displayName = 'SideBar';

export const SideBar = (props: SideBarProps) => {
  const {} = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const handlers = useSwipeable({
    minDistance: 100,
    swipeDuration: 1000,
    onSwipeRight: ({ event }) => {
      event.preventDefault();
      setIsOpen(true);
    },
    onSwipeLeft: ({ event }) => {
      if (event.pointerType === 'touch') {
        event.preventDefault();
        setIsOpen(false);
      }
    },
  });

  React.useEffect(() => {
    document.addEventListener('pointerdown', handlers.onPointerDown);
    document.addEventListener('pointermove', handlers.onPointerMove);
    document.addEventListener('pointerup', handlers.onPointerUp);
    document.addEventListener(
      'pointercancel',
      handlers.onPointerCancel,
    );

    return () => {
      document.removeEventListener(
        'pointerdown',
        handlers.onPointerDown,
      );
      document.removeEventListener(
        'pointermove',
        handlers.onPointerMove,
      );
      document.removeEventListener('pointerup', handlers.onPointerUp);
      document.removeEventListener(
        'pointercancel',
        handlers.onPointerCancel,
      );
    };
  }, [
    handlers.onPointerCancel,
    handlers.onPointerDown,
    handlers.onPointerMove,
    handlers.onPointerUp,
  ]);

  return (
    <aside
      data-open={isOpen}
      className="fixed -left-full top-[104px] h-[calc(100vh-104px)] w-[230px] bg-background shadow-lg data-[open=true]:left-0"
    >
      SideBar
    </aside>
  );
};

SideBar.displayName = displayName;
