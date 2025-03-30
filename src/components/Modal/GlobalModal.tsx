import { useEffect, useRef } from 'react';
import { useModalStore } from 'src/store';

export const GlobalModal = () => {
  const { isOpen, content, closeModal, customStyle, isCloseButton } =
    useModalStore();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCloseButton) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal, isCloseButton]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 max-w-[500px] w-full h-[300px] bg-gray-800'
      style={customStyle}
    >
      {isCloseButton && (
        <div
          className='bg-black text-right cursor-pointer text-white h-6'
          onClick={closeModal}
        >
          X&nbsp;
        </div>
      )}
      {content}
    </div>
  );
};
