import { Modal } from 'components/Modal/Modal';
import { HTMLAttributes, ReactNode } from 'react';

import { EditMeteoType } from './ModifyLipno';

type ModifyLipnoModalType = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  editMeteo: EditMeteoType;
  setEditMeteo: React.Dispatch<React.SetStateAction<EditMeteoType>>;
};

export const ModifyLipnoModal = ({
  children,
  editMeteo,
  setEditMeteo,
}: ModifyLipnoModalType) => {
  return (
    <Modal
      customStyle={{ width: '90%', maxWidth: '600px', height: '50%' }}
      setIsVisible={() => setEditMeteo((orig) => ({ ...orig, method: null }))}
    >
      <div className='flex flex-col items-center justify-center p-4 bg-black/80'>
        {editMeteo.methodResult === 'error' && (
          <div> Někde nastala chyba :-(</div>
        )}
        {children}
      </div>
    </Modal>
  );
};
