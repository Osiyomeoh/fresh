import { useContext } from 'react';
import ReactModal from 'react-modal';
import { Toaster } from 'react-hot-toast';
import { ModalContext } from './context';
import { SlashAuthRoutes } from './routes';

export const AppContents = () => {
  const modalContext = useContext(ModalContext);

  ReactModal.setAppElement('#root');
  return (
    <>
      <Toaster position={'top-center'} />
      <SlashAuthRoutes />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <ReactModal
        isOpen={modalContext.isShowing}
        onRequestClose={modalContext.hide}
        style={{
          overlay: {
            backgroundColor: 'rgba(35, 35, 35, 0.5)',
            zIndex: 50,
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
            padding: '26px',
            border: null,
          },
        }}
      >
        {modalContext.contents}
      </ReactModal>
    </>
  );
};
