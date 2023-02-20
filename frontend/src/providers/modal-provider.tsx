import React, { useCallback, useState } from 'react';
import {
  ModalActionTypeClose,
  ModalActionTypeOpen,
  ModalContext,
  ModalListenerFn,
  ModalType,
} from '../context';

type Props = {
  children: React.ReactNode;
};

type ModalListener = {
  id: string;
  fn: ModalListenerFn;
};

type ContentState = {
  contents: React.ReactNode;
  type: ModalType;
};

const ModalProvider = ({ children }: Props) => {
  const [contentsState, setContentsState] = useState<ContentState>(null);
  const [isShowing, setShowing] = useState(false);

  const [listeners, setListeners] = useState<{
    [key: ModalType]: ModalListener[];
  }>({});

  const addListener = useCallback(
    (type: ModalType, fn: ModalListenerFn) => {
      const id = Math.random().toString();

      const listenerObj = {
        id,
        fn,
      };

      const existingListeners = listeners[type] || [];
      setListeners({
        ...listeners,
        [type]: [...existingListeners, listenerObj],
      });

      return () => {
        const newListeners = (listeners[type] || []).filter(
          (listener) => listener.id !== id
        );

        setListeners({
          ...listeners,
          [type]: newListeners,
        });
      };
    },
    [listeners]
  );

  return (
    <ModalContext.Provider
      value={{
        contents: contentsState?.contents || null,
        isShowing,
        show: () => {
          if (contentsState) {
            setShowing(true);
            for (const listener of listeners[contentsState.type] || []) {
              listener.fn(ModalActionTypeOpen);
            }
          }
        },
        hide: () => {
          setShowing(false);
          if (contentsState) {
            for (const listener of listeners[contentsState.type] || []) {
              listener.fn(ModalActionTypeClose);
            }
          }
        },
        setContents: (
          type: ModalType,
          contents: React.ReactNode,
          show?: boolean
        ) => {
          setContentsState({
            type,
            contents,
          });
          if (show) {
            setShowing(true);
          }
        },
        addListener: addListener,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
