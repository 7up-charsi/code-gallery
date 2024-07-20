import { Button } from '@typeweave/react/button';
import { Badge } from '@typeweave/react/badge';
import { ShoppingBagIcon } from 'lucide-react';
import React from 'react';

interface CartButtonProps {}

const displayName = 'CartButton';

export const CartButton = (props: CartButtonProps) => {
  const {} = props;

  return (
    <>
      <div className="flex select-none items-center gap-1">
        <span className="text-sm font-medium">$57</span>

        <Badge
          placement="bottom-center"
          color="primary"
          classNames={{ content: 'size-4' }}
          content={7}
        >
          <Button variant="text" isIconOnly aria-label="cart">
            <ShoppingBagIcon />
          </Button>
        </Badge>
      </div>
    </>
  );
};

CartButton.displayName = displayName;
