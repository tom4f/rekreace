import styled from '@emotion/styled';
import img604b from 'images/604b.jpg';
import { Button, Input, Select, TextArea } from 'src/components/Atoms';
import { SendBookingRequest, UpdateBookingRequest } from 'src/features/booking';

import { FormMode } from './Form';
import { orderStatusOptions } from './formConfig';

type FormFieldsType = {
  formMode: FormMode;
  setFormMode: React.Dispatch<React.SetStateAction<FormMode>>;
  formData: SendBookingRequest | UpdateBookingRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<SendBookingRequest | UpdateBookingRequest>
  >;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const FormFields = ({
  formMode,
  setFormMode,
  onSubmit,
  formData,
  setFormData,
}: FormFieldsType) => {
  const isUpdateForm = formMode === 'update' && 'order_status' in formData;
  const isNewForm = formMode === 'new' && 'antispam_code_orig' in formData;
  const isCopyForm = formMode === 'copy' && 'antispam_code_orig' in formData;

  const handleToggleFormMode = () => {
    setFormMode((prev) => (prev === 'copy' ? 'update' : 'copy'));
  };

  return (
    <FormWrapper autoComplete='off' onSubmit={onSubmit} name='form_booking'>
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
          {
            value: '',
            label: 'vyberte zde',
            disabled: !!formData.apartment,
          },
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

      {isUpdateForm && (
        <Input
          label='⭐Oslovení:'
          type='text'
          name='title_prefix'
          value={formData.title_prefix ?? ''}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              title_prefix: e.target.value,
            }))
          }
          placeholder='vyplňte zde'
        />
      )}

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

      {isUpdateForm && (
        <Select
          name='order_status'
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              order_status: e.target
                .value as UpdateBookingRequest['order_status'],
            }))
          }
          value={formData.order_status}
          label='⭐Stav:'
          options={orderStatusOptions}
        />
      )}

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

      {isUpdateForm && (
        <>
          <TextArea
            label='⭐Splatnost:'
            value={formData?.due_date_info ?? ''}
            onChange={(e) =>
              setFormData((old) => ({
                ...old,
                due_date_info: e.target.value,
              }))
            }
            placeholder='vyplňte zde'
            rows={4}
            cols={68}
            name='due_date_info'
          />
          <TextArea
            label='⭐Další info:'
            value={formData?.order_info ?? ''}
            onChange={(e) =>
              setFormData((old) => ({
                ...old,
                order_info: e.target.value,
              }))
            }
            placeholder='vyplňte zde'
            rows={4}
            cols={68}
            name='order_info'
          />
        </>
      )}

      {(isNewForm || isCopyForm) && formData.antispam_code_orig && (
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

      <Button
        name={isNewForm ? 'new' : 'update'}
        label={
          isNewForm
            ? 'Zkontrolovat'
            : isUpdateForm
            ? 'Upravit'
            : 'Zkontrolovat a zkopírovat'
        }
      />

      {!isNewForm && (
        <Button
          variant='blue'
          name='toggleFormMode'
          label={`Přepnout na ${
            formMode === 'copy' ? 'editaci' : 'zkopírovat objednávku'
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleToggleFormMode();
          }}
        />
      )}
    </FormWrapper>
  );
};

export const FormWrapper = styled.form`
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
