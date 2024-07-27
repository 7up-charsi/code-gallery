'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { Loader2Icon, LogOutIcon } from 'lucide-react';
import { Button } from '@typeweave/react/button';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LogoutButtonProps {}

const displayName = 'LogoutButton';

export const LogoutButton = (props: LogoutButtonProps) => {
  const {} = props;

  const { signOut } = useAuthActions();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  return (
    <Button
      isIconOnly
      aria-label="logout"
      color="danger"
      onPress={async () => {
        if (loading) return;
        setLoading(true);
        await signOut();
        router.push('/sign-in');
      }}
    >
      {loading ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <LogOutIcon />
      )}
    </Button>
  );
};

LogoutButton.displayName = displayName;
