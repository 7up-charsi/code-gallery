'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { PointerEvents } from '@typeweave/react/pointer-events';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { navLinks } from '../_constants/nav-links';
import { Button } from '@typeweave/react/button';
import { MenuIcon, XIcon } from 'lucide-react';
import { siteConfig } from '../site.config';
import { createPortal } from 'react-dom';
import { NavLink } from './nav-link';
import { Branding } from '@repo/ui';
import React from 'react';

interface SideBarProps {}

const displayName = 'SideBar';

export const SideBar = (props: SideBarProps) => {
  const {} = props;

  const [open, setOpen] = React.useState(false);

  const isPanningStartRef = React.useRef(false);
  const panningStartPointRef = React.useRef(0);
  const panningStartTimeRef = React.useRef(0);
  const openRef = React.useRef(false);
  const pointerIdRef = React.useRef<number | null>(null);

  const isMounted = useIsMounted();

  const x = useMotionValue(-280);
  const overlayOpacity = useTransform(x, [-280, 0], [0, 1]);
  const display = useTransform(x, [-280, 0], ['none', 'block']);

  const handleOpen = React.useCallback(() => {
    openRef.current = true;
    setOpen(true);
  }, []);

  const handleClose = () => {
    openRef.current = false;
    setOpen(false);
  };

  React.useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (
        window.innerWidth > 1024 ||
        openRef.current ||
        pointerIdRef.current
      )
        return;

      if (e.clientX < 100) {
        e.preventDefault();
        pointerIdRef.current = e.pointerId;
        panningStartPointRef.current = e.clientX;
        isPanningStartRef.current = true;
        panningStartTimeRef.current = e.timeStamp;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (
        window.innerWidth > 1024 ||
        !isPanningStartRef.current ||
        openRef.current ||
        e.pointerId !== pointerIdRef.current
      )
        return;

      pointerIdRef.current = null;
      isPanningStartRef.current = false;
      panningStartPointRef.current = 0;

      const start = panningStartPointRef.current;
      const time = e.timeStamp - panningStartTimeRef.current;

      const delta = e.clientX - start;

      const isSwipe = delta >= 80 && time < 1000;

      const currX = x.get();

      if (isSwipe) {
        handleOpen();
        return;
      }

      if (currX < -200) {
        x.set(-280);
        return;
      } else {
        handleOpen();
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (
        window.innerWidth > 1024 ||
        openRef.current ||
        e.pointerId !== pointerIdRef.current
      )
        return;

      if (isPanningStartRef.current && panningStartPointRef.current) {
        const start = panningStartPointRef.current;

        const isValidPanning = e.clientX > start;

        if (!isValidPanning) return;

        x.set(Math.min(e.clientX - start - 280, 0));
      }
    };

    const handlePointerCancel = () => {
      isPanningStartRef.current = false;
      panningStartPointRef.current = 0;
      panningStartTimeRef.current = 0;
      openRef.current = false;
      pointerIdRef.current = null;
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener(
        'pointercancel',
        handlePointerCancel,
      );
    };
  }, [handleOpen, x]);

  return (
    <>
      <Button
        isIconOnly
        aria-label="open menu"
        variant="text"
        className="text-2xl lg:hidden"
        onPress={handleOpen}
      >
        <MenuIcon />
      </Button>

      {isMounted &&
        createPortal(
          <>
            <PointerEvents
              onPress={(e) => {
                if (e.currentTarget === e.target) {
                  handleClose();
                }
              }}
            >
              <motion.div
                style={{ opacity: overlayOpacity, display }}
                transition={{ duration: 0.2, type: 'tween' }}
                className="bg-overlay fixed inset-0 z-40 lg:hidden"
              />
            </PointerEvents>

            <motion.div
              animate={open ? 'show' : 'hide'}
              variants={{
                show: { x: 0, display: 'block' },
                hide: { x: -280, display: 'none' },
              }}
              transition={{ duration: 0.2, type: 'tween' }}
              style={{ x, display }}
              className="bg-paper fixed left-0 top-0 z-50 h-screen w-[280px] lg:hidden"
            >
              <div className="flex h-16 items-center justify-between px-5">
                <Branding href={siteConfig.pathname}>
                  {siteConfig.name}
                </Branding>

                <Button
                  isIconOnly
                  aria-label="close menu"
                  variant="text"
                  color="danger"
                  onPress={handleClose}
                >
                  <XIcon />
                </Button>
              </div>

              <nav
                id="side-bar-nav"
                className="flex flex-col gap-1 px-5 md:px-3 md:py-3"
              >
                {navLinks.map(({ icon, label, href }, i) => (
                  <NavLink
                    key={i}
                    href={`${siteConfig.pathname}${href}`}
                    className="ring-focus before:bg-primary-9 hover:bg-muted-3 active:bg-muted-4 group relative grid h-12 w-full grid-cols-[48px_1fr] items-center overflow-hidden whitespace-nowrap rounded capitalize outline-none before:absolute before:bottom-0 before:left-0 before:top-1/2 before:hidden before:h-1/3 before:w-1 before:-translate-y-1/2 before:rounded-full focus-visible:ring-2 data-[active=true]:before:block"
                  >
                    <span className="group-data-[active=true]:text-primary-11 mx-auto">
                      {icon}
                    </span>
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>,
          document.body,
        )}
    </>
  );
};

SideBar.displayName = displayName;
