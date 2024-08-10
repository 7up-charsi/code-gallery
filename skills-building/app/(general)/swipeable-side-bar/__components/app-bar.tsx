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

  const isMounted = useIsMounted();

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const x = useMotionValue(0);
  const overlayOpacity = useTransform(x, [-280, 0], [0, 1]);

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
      if (e.clientX < 100) {
        e.preventDefault();
        panningStartPointRef.current = e.clientX;
        isPanningStartRef.current = true;
        panningStartTimeRef.current = e.timeStamp;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      isPanningStartRef.current = false;
      panningStartPointRef.current = 0;

      const start = panningStartPointRef.current;
      const time = e.timeStamp - panningStartTimeRef.current;

      const delta = e.clientX - start;

      const isSwipe = delta >= 120 && time < 1000;

      const currX = x.get();

      if (isSwipe) {
        x.set(0);
        return;
      }

      if (currX < -140) {
        x.set(-280);
        return;
      } else {
        x.set(0);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isPanningStartRef.current && panningStartPointRef.current) {
        const start = panningStartPointRef.current;

        const isValidPanning = e.clientX > start;

        if (!isValidPanning) return;

        x.set(Math.min(e.clientX - start - 280, 0));
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointermove', handlePointerMove);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, [x]);

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
          aria-label="menu"
          variant="text"
          className="text-2xl lg:hidden"
          onPress={() => {
            setOpen(true);
          }}
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
                  setOpen(false);
                }
              }}
            >
              <motion.div
                data-open={open}
                style={{ opacity: overlayOpacity }}
                initial={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-overlay lg:hidden"
              />
            </PointerEvents>

            <motion.div
              initial={{ x: -280 }}
              style={{ x }}
              className="fixed left-0 top-0 z-50 h-screen w-[280px] bg-white data-[open=false]:hidden lg:hidden"
            >
              <div className="flex h-16 items-center justify-between px-5">
                <Branding href={siteConfig.pathname}>
                  {siteConfig.name}
                </Branding>

                <Button
                  isIconOnly
                  aria-label="menu"
                  variant="text"
                  color="danger"
                  onPress={() => {
                    setOpen(false);
                  }}
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
