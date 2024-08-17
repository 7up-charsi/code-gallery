import { Bounce, ToastContainer } from 'react-toastify';
import React from 'react';

interface ToastifyContainerProps {}

const displayName = 'ToastifyContainer';

export const ToastifyContainer = (props: ToastifyContainerProps) => {
  const {} = props;

  return (
    <>
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Bounce}
      />
    </>
  );
};

ToastifyContainer.displayName = displayName;
