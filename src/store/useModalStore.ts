import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ModalState = {
  isOpen: boolean;
  content: React.ReactNode;
  customStyle?: React.CSSProperties;
  isCloseButton?: boolean;
  openModal: (params: {
    content: React.ReactNode;
    customStyle?: React.CSSProperties;
    isCloseButton?: boolean;
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

      openModal: ({ content, customStyle, isCloseButton = true }) =>
        set({ isOpen: true, content, customStyle, isCloseButton }),

      closeModal: () =>
        set({
          isOpen: false,
          content: null,
          customStyle: undefined,
          isCloseButton: true,
        }),
    }),
    { enabled: process.env.NODE_ENV !== 'production' }
  )
);
