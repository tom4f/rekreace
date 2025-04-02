import styled from '@emotion/styled';
import { AlertBox } from 'components/AlertBox/AlertBox';
// import { useSendBooking } from 'features/booking';
import img604b from 'images/604b.jpg';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Header, Input, Select, TextArea } from 'src/components/Atoms';
import {
  Order,
  SendBookingRequest,
  useUpdateBookingGraphQL,
} from 'src/features/booking';
import { useSendBookingGraphQL } from 'src/features/booking/hooks/useSendBookingGraphQL';
import { useModalStore } from 'src/store';

const commonData = {
  apartment: 0,
  persons: 0,
  check_in: '',
  check_out: '',
  email: '',
  phone: '',
  name: '',
  confirm_via: '',
  address: '',
  info: '',
};

const createData: SendBookingRequest = {
  ...commonData,
  antispam_code: 0,
  antispam_code_orig: new Date().getMilliseconds(),
};

const defaultUpdateData: Order = {
  ...commonData,
  id: 0,
  order_status: 'new',
  created_at: '',
  __typename: '',
};

type FormType = {
  updateData?: Order;
};

type FormMode = 'new' | 'update';

export const Form = ({ updateData }: FormType) => {
  const { pathname } = useLocation();
  const [sendBooking, { data, error }] = useSendBookingGraphQL();
  const [updateBooking, { data: updateDataResp, error: updateError }] =
    useUpdateBookingGraphQL();
  const isOrdersUrl = pathname.startsWith('/orders');

  const openModal = useModalStore((state) => state.openModal);

  const [formMode, setFormMode] = useState<FormMode>(
    isOrdersUrl ? 'update' : 'new'
  );
  const [formData, setFormData] = useState<SendBookingRequest | Order>(
    isOrdersUrl ? defaultUpdateData : createData
  );

  const prevValues = useRef({
    formMode,
  });

  useEffect(() => {
    if (prevValues.current.formMode == formMode) {
      if (formMode === 'new' && (error || data?.sendBooking.message)) {
        openModal({
          content: (
            <AlertBox
              alert={{
                header: error ? 'Chyba' : 'V pořádku',
                text:
                  error instanceof Error
                    ? error?.message
                    : data?.sendBooking.message,
                color: error ? 'red' : 'lime',
              }}
            />
          ),
        });
        setFormData((old) => ({
          ...old,
          antispam_code_orig: new Date().getMilliseconds(),
        }));
      }

      if (
        formMode === 'update' &&
        (updateError || updateDataResp?.updateBooking.message)
      ) {
        openModal({
          content: (
            <AlertBox
              alert={{
                header:
                  (updateError && 'Chyba') ||
                  (updateDataResp?.updateBooking.message && 'V pořádku'),
                text:
                  updateError instanceof Error
                    ? updateError?.message
                    : updateDataResp?.updateBooking.message,
                color: updateError ? 'red' : 'lime',
              }}
            />
          ),
        });
      }
    }
    prevValues.current = {
      formMode,
    };
  }, [data, updateDataResp, error, updateError, formMode, openModal]);

  useEffect(() => {
    if (formMode === 'update') {
      if (isOrdersUrl && updateData && Object.keys(updateData).length > 0) {
        setFormData(updateData);
      }
    } else {
      setFormData(createData);
    }
  }, [updateData, isOrdersUrl, formMode]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (formMode === 'update' && 'id' in formData) {
        const updatedData = { ...formData };
        delete updatedData.__typename;
        await updateBooking({ variables: { input: updatedData } });
      }

      if (formMode === 'new' && 'antispam_code' in formData) {
        await sendBooking({ variables: { input: formData } });
      }
    } catch (errorResponse) {
      console.error({ errorResponse });
    }
  };

  const toggleMode = () =>
    setFormMode((prev) => (prev === 'new' ? 'update' : 'new'));

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
            onClick={toggleMode}
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

      <FormWrapper
        autoComplete='off'
        onSubmit={(e) => onSubmit(e)}
        name='form_booking'
      >
        <Select
          name='apartment'
          required
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              apartment: +e.target.value,
            }))
          }
          value={formData.apartment}
          label='Apartmán číslo:'
          options={[
            { value: '', label: 'vyberte zde', disabled: !!formData.apartment },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
          ]}
        />

        <Select
          name='persons'
          required
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              persons: +e.target.value,
            }))
          }
          value={formData.persons}
          label='Počet osob:'
          options={[
            { value: '', label: 'vyberte zde', disabled: !!formData.persons },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
          ]}
        />

        <Input
          label='Datum příjezdu:'
          required
          type='date'
          name='check_in'
          value={formData.check_in}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              check_in: e.target.value,
            }))
          }
        />

        <Input
          label='Datum odjezdu:'
          required
          type='date'
          name='check_out'
          value={formData.check_out}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              check_out: e.target.value,
            }))
          }
        />

        <Input
          label='E-mail:'
          required
          type='email'
          name='email'
          value={formData.email}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              email: e.target.value,
            }))
          }
          placeholder='vyplňte zde'
        />

        <Input
          label='Telefon:'
          required
          type='tel'
          name='phone'
          value={formData.phone}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              phone: e.target.value,
            }))
          }
          placeholder='vyplňte zde'
        />

        <Input
          label='Jméno a příjmení:'
          required
          type='text'
          name='name'
          value={formData.name}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              name: e.target.value,
            }))
          }
          placeholder='vyplňte zde'
        />

        <Select
          name='confirm_via'
          required
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              confirm_via: e.target.value,
            }))
          }
          value={formData.confirm_via}
          label='Odpovědět:'
          options={[
            { value: '', label: 'vyberte zde' },
            { value: 'phone', label: 'telefonem' },
            { value: 'email', label: 'emailem' },
          ]}
        />

        <TextArea
          label='Adresa:'
          value={formData.address}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              address: e.target.value,
            }))
          }
          placeholder='Váše adresa'
          required
          rows={4}
          cols={68}
          name='address'
        />

        <TextArea
          label='Váš komentář:'
          value={formData?.info ?? ''}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              info: e.target.value,
            }))
          }
          placeholder='vyplňte zde'
          rows={4}
          cols={68}
          name='info'
        />

        {formMode === 'new' && 'antispam_code_orig' in formData && (
          <>
            {' '}
            <Input
              label={`Opište kód : ${formData.antispam_code_orig}`}
              required
              type='number'
              name='antispam_code'
              value={formData.antispam_code || ''}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  antispam_code: +e.target.value,
                }))
              }
              placeholder='sem kód'
              size={5}
            />
            <input
              type='hidden'
              name='antispam_code_orig'
              value={formData.antispam_code_orig}
            />
          </>
        )}

        {formMode === 'update' && 'order_status' in formData && (
          <Select
            name='order_status'
            onChange={(e) =>
              setFormData((old) => ({
                ...old,
                order_status: e.target.value as Order['order_status'],
              }))
            }
            value={formData.order_status}
            label='Stav:'
            options={[
              { value: 'new', label: 'nová' },
              { value: 'confirmed', label: 'potvrzeno' },
              { value: 'canceled', label: 'zrušeno' },
              { value: 'completed', label: 'uskutečněno' },
            ]}
          />
        )}
        <Button
          name={formMode === 'new' ? 'new' : 'update'}
          label={formMode === 'new' ? 'Odeslat' : 'Upravit'}
        />
      </FormWrapper>
    </div>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-image: url(${img604b});
  width: 100%;
  padding: 0px;
  color: white;
  text-align: left;
  margin: auto;
  border-radius: 5px;
  border: 1px solid #555;
  margin-top: 0rem;
  margin-bottom: 0rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  position: relative;

  & > * {
    width: 45%;
  }

  input::placeholder,
  textarea::placeholder {
    color: white;
  }

  input:placeholder-shown,
  textarea:placeholder-shown {
    font-style: italic;
  }
`;
