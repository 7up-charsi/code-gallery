'use client';

import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@typeweave/react/tooltip';
import { Loader2Icon, LogOutIcon } from 'lucide-react';
import { Button } from '@typeweave/react/button';
import { useAuth } from '@clerk/nextjs';
import React from 'react';

interface LogoutButtonProps {}

const displayName = 'LogoutButton';

export const LogoutButton = (props: LogoutButtonProps) => {
  const {} = props;

  const { signOut } = useAuth();

  const [loading, setLoading] = React.useState(false);

  return (
    <TooltipRoot>
      <TooltipTrigger>
        <Button
          isIconOnly
          aria-label="logout"
          color="danger"
          onPress={async () => {
            if (loading) return;
            setLoading(true);
            await signOut({ redirectUrl: '/sign-in' });
          }}
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <LogOutIcon />
          )}
        </Button>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent
          mainOffset={5}
          className="bg-black/70 text-white"
        >
          logout
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  );
};

LogoutButton.displayName = displayName;
