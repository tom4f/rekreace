import { AlertBox } from 'components/AlertBox/AlertBox';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from 'src/components/Atoms';
import {
  SendBookingRequest,
  UpdateBookingRequest,
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

export type FormMode = 'new' | 'update' | 'copy';

export const Form = () => {
  const { pathname } = useLocation();

  const [updateBooking, { data: updateDataResp, error: updateError }] =
    useUpdateBookingGraphQL();
  const isOrdersUrl = pathname.startsWith('/objednavka/edit-orders');
  const orderData = useOrder();

  const orderDataForUpdate = useMemo(
    () =>
      orderData ? (({ __typename, ...rest }) => rest)(orderData) : undefined,
    [orderData]
  );

  const openModal = useModalStore((state) => state.openModal);

  const [formMode, setFormMode] = useState<FormMode>(
    isOrdersUrl ? 'update' : 'new'
  );

  const [formData, setFormData] = useState<
    SendBookingRequest | UpdateBookingRequest
  >(isOrdersUrl ? updateOrderDefaultData : newOrderDefaultData);

  useEffect(() => {
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
  }, [updateDataResp, updateError, openModal, formMode]);

  useEffect(() => {
    if (
      formMode === 'update' &&
      orderDataForUpdate &&
      Object.keys(orderDataForUpdate).length > 0
    ) {
      setFormData(orderDataForUpdate);
    }

    if (formMode === 'new') {
      setFormData(newOrderDefaultData);
    }

    if (
      formMode === 'copy' &&
      orderDataForUpdate &&
      Object.keys(orderDataForUpdate).length > 0
    ) {
      setFormData({
        ...orderDataForUpdate,
        antispam_code: 0,
        antispam_code_orig: new Date().getMilliseconds(),
        id: undefined,
      });
    }
  }, [orderDataForUpdate, formMode]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formMode === 'update' && 'id' in formData) {
      const updatedData = { ...formData };
      updateBooking({ variables: { input: updatedData } });
    } else if ('antispam_code' in formData) {
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
      <Header>
        {formMode === 'update'
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
        setFormMode={setFormMode}
      />
    </div>
  );
};
