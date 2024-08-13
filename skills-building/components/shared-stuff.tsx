import { Bounce, ToastContainer } from 'react-toastify';
import React from 'react';

interface SharedStuffProps {}

const displayName = 'SharedStuff';

export const SharedStuff = (props: SharedStuffProps) => {
  const {} = props;

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

SharedStuff.displayName = displayName;
