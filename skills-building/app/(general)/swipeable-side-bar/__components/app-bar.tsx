'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { PointerEvents } from '@typeweave/react/pointer-events';
import { PortfolioHeader } from '@/components/portfolio-header';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { navLinks } from '../__constants/nav-links';
import { Overlay } from '@typeweave/react/overlay';
import { Button } from '@typeweave/react/button';
import { Branding } from '@/components/branding';
import { MenuIcon, XIcon } from 'lucide-react';
import { siteConfig } from '../site.config';
import { createPortal } from 'react-dom';
import { NavLink } from './nav-link';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const isPanningStartRef = React.useRef(false);
  const panningStartPointRef = React.useRef(0);
  const panningStartTimeRef = React.useRef(0);
  const openRef = React.useRef(false);
  const pointerIdRef = React.useRef<number | null>(null);

  const isMounted = useIsMounted();

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const x = useMotionValue(-280);
  const overlayOpacity = useTransform(x, [-280, 0], [0, 1]);
  const display = useTransform(x, [-280, 0], ['none', 'block']);

  const handleOpen = React.useCallback(() => {
    openRef.current = true;
    setOpen(true);
  }, []);

  const handleClose = () => {
    // pointerIdRef.current = null;
    openRef.current = false;
    setOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const bodyScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (bodyScroll) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (openRef.current || pointerIdRef.current) return;

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
      if (openRef.current || e.pointerId !== pointerIdRef.current)
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
    <header
      data-scrolled={isScrolled}
      className="sticky left-0 right-0 top-0 mx-auto max-w-screen-2xl transition-transform data-[scrolled=true]:shadow-md"
    >
      <PortfolioHeader />

      <div className="flex h-16 items-center bg-muted-2 px-5 md:px-10">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        <Button
          isIconOnly
          aria-label="open menu"
          variant="text"
          className="text-2xl lg:hidden"
          onPress={handleOpen}
        >
          <MenuIcon />
        </Button>

        <nav className="flex items-center gap-1 max-lg:hidden">
          {navLinks.map((ele, i) => (
            <NavLink
              key={i}
              href={`${siteConfig.pathname}${ele.href}`}
              className="h-9 w-full content-center rounded border border-transparent px-2 capitalize outline-none ring-focus hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4 data-[active=true]:border-primary-8 data-[active=true]:bg-primary-3 data-[active=true]:text-primary-11"
            >
              {ele.label}
            </NavLink>
          ))}
        </nav>
      </div>

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
                className="fixed inset-0 z-40 bg-overlay lg:hidden"
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
              className="fixed left-0 top-0 z-50 h-screen w-[280px] bg-white lg:hidden"
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
                className="flex flex-col gap-3 px-5 md:px-3 md:py-3"
              >
                {navLinks.map(({ icon, label, href }, i) => (
                  <NavLink
                    key={i}
                    href={`${siteConfig.pathname}${href}`}
                    className="grid h-12 w-full grid-cols-[46px_1fr] items-center overflow-hidden whitespace-nowrap rounded border border-transparent capitalize outline-none ring-focus hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4 data-[active=true]:border-primary-8 data-[active=true]:bg-primary-3 data-[active=true]:text-primary-11"
                  >
                    <span className="mx-auto text-xl dynamic-icon">
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
    </header>
  );
};

AppBar.displayName = displayName;
