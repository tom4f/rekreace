import { AlertBox } from 'components/AlertBox/AlertBox';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Header } from 'src/components/Atoms';
import {
  Order,
  SendBookingRequest,
  useOrder,
  useUpdateBookingGraphQL,
} from 'src/features/booking';
import { useModalStore } from 'src/store';

import {
  FormFields,
  newOrderDefaultData,
  OrderSummary,
  updateOrderDefaultData,
} from './';

export type FormMode = 'new' | 'update';

export const Form = () => {
  const { pathname } = useLocation();
  const orderDataForUpdate = useOrder();

  const [updateBooking, { data: updateDataResp, error: updateError }] =
    useUpdateBookingGraphQL();
  const isOrdersUrl = pathname.startsWith('/orders');

  const openModal = useModalStore((state) => state.openModal);

  const [formMode, setFormMode] = useState<FormMode>(
    isOrdersUrl ? 'update' : 'new'
  );
  const [formData, setFormData] = useState<SendBookingRequest | Order>(
    isOrdersUrl ? updateOrderDefaultData : newOrderDefaultData
  );

  const prevFormMode = useRef(formMode);

  useEffect(() => {
    if (prevFormMode.current !== formMode) {
      prevFormMode.current = formMode;
      return;
    }

    if (
      formMode === 'update' &&
      (updateError || updateDataResp?.updateBooking.message)
    ) {
      openModal({
        content: (
          <AlertBox
            alert={{
              header: updateError ? 'Chyba' : 'V pořádku',
              text:
                updateError instanceof Error
                  ? updateError.message
                  : updateDataResp?.updateBooking.message ?? '',
              color: updateError ? 'red' : 'lime',
            }}
          />
        ),
      });
    }
  }, [updateDataResp, updateError, formMode, openModal]);

  useEffect(() => {
    if (formMode === 'update') {
      if (
        isOrdersUrl &&
        orderDataForUpdate &&
        Object.keys(orderDataForUpdate).length > 0
      ) {
        setFormData(orderDataForUpdate);
      }
    } else {
      setFormData(newOrderDefaultData);
    }
  }, [orderDataForUpdate, isOrdersUrl, formMode]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formMode === 'update' && 'id' in formData) {
      const updatedData = { ...formData };
      delete updatedData.__typename;
      updateBooking({ variables: { input: updatedData } });
    }

    if (formMode === 'new' && 'antispam_code' in formData) {
      const refreshAntispamCode = () =>
        setFormData((old) => ({
          ...old,
          antispam_code_orig: new Date().getMilliseconds(),
        }));
      openModal({
        content: (
          <OrderSummary
            formData={formData}
            onSuccess={(message) =>
              openModal({
                content: (
                  <AlertBox
                    alert={{
                      header: 'V pořádku',
                      text: message,
                      color: 'lime',
                    }}
                  />
                ),
                onCloseFn: refreshAntispamCode,
              })
            }
            onError={(error) =>
              openModal({
                content: (
                  <AlertBox
                    alert={{
                      header: 'Chyba',
                      text: error.message,
                      color: 'red',
                    }}
                  />
                ),
                onCloseFn: refreshAntispamCode,
              })
            }
          />
        ),
        customStyle: { height: 'auto', maxHeight: 'auto' },
        onCloseFn: refreshAntispamCode,
      });
    }
  };

  return (
    <div id='1'>
      {isOrdersUrl && (
        <>
          {' '}
          <Button
            style={{ margin: '20px' }}
            label={
              formMode === 'new'
                ? 'Přepnout na úpravu objednávky'
                : 'Přepnout na vytvoření nové objednávky'
            }
            onClick={() => setFormMode(formMode === 'new' ? 'update' : 'new')}
            variant={formMode === 'update' ? 'primary' : 'secondary'}
          />
        </>
      )}
      <Header>
        {isOrdersUrl && formMode === 'update'
          ? `Upravujete (${'id' in formData ? formData.id : 'N/A'}) ${
              formData.name
            }`
          : 'Závazná objednávka ubytování'}
      </Header>

      <FormFields
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
        formMode={formMode}
      />
    </div>
  );
};
