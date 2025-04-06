import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ModalState = {
  isOpen: boolean;
  content: React.ReactNode;
  customStyle?: React.CSSProperties;
  isCloseButton?: boolean;
  onCloseFn?: () => void;
  openModal: (params: {
    content: React.ReactNode;
    customStyle?: React.CSSProperties;
    isCloseButton?: boolean;
    onCloseFn?: () => void;
  }) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>()(
  devtools(
    (set) => ({
      isOpen: false,
      type: null,
      content: null,
      customStyle: undefined,
      isCloseButton: true,
      onCloseFn: null,

      openModal: ({ content, customStyle, isCloseButton = true, onCloseFn }) =>
        set({
          isOpen: true,
          content,
          customStyle,
          isCloseButton,
          onCloseFn,
        }),

      closeModal: () =>
        set((state) => {
          state.onCloseFn?.();

          return {
            isOpen: false,
            content: null,
            customStyle: undefined,
            isCloseButton: true,
            onCloseFn: undefined,
          };
        }),
    }),
    { enabled: process.env.NODE_ENV !== 'production' }
  )
);
