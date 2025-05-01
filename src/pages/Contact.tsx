import { zodResolver } from '@hookform/resolvers/zod';
import { AlertBox } from 'components/AlertBox/AlertBox';
import { Button, Header, Input, TextArea } from 'components/Atoms';
import { SendMessageRequest, useSendMessage } from 'features/contact';
import {
  ContactFormSchema,
  contactSchema,
} from 'features/contact/contact.schema';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { ContactInfo } from 'src/components/Contact';
import {
  ContactWrapper,
  SubmitWrapper,
} from 'src/components/Contact/css/Contact.style';
import { useModalStore } from 'src/store';

export const Contact = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const { mutate, isPending } = useSendMessage();

  const openModal = useModalStore((state) => state.openModal);
  const [currentTimestamp, setCurrentTimestamp] = useState(
    new Date().getMilliseconds()
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(
    () => setValue('antispam_code_orig', currentTimestamp),
    [currentTimestamp, setValue]
  );

  useEffect(() => {
    if (location.hash === '#map' && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const refreshTimestamp = () => {
    const newTimestamp = new Date().getMilliseconds();
    setCurrentTimestamp(newTimestamp);
    setValue('antispam_code_orig', newTimestamp);
  };

  const onSubmit: SubmitHandler<SendMessageRequest> = (formObject) => {
    mutate(formObject, {
      onSuccess: (succesResponse) => {
        refreshTimestamp();
        openModal({
          content: (
            <AlertBox
              alert={{
                header: 'V pořádku',
                text: succesResponse.result,
                color: 'lime',
              }}
            />
          ),
        });
      },
      onError: (errorResponse) => {
        refreshTimestamp();
        openModal({
          content: (
            <AlertBox
              alert={{
                header: 'Chyba',
                text: errorResponse.response?.data.result,
                color: 'red',
              }}
            />
          ),
        });
      },
    });
  };

  return (
    <>
      <Header>Kontaktní informace</Header>
      <ContactWrapper>
        <ContactInfo />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder='vyplňte svojí e-mailovou adresu'
            label={
              <>
                E-mail:{' '}
                <span style={{ color: 'lime' }}>
                  {errors.emailova_adresa && errors.emailova_adresa.message}
                </span>
              </>
            }
            type='text'
            inputMode='email'
            autoComplete='email'
            {...register('emailova_adresa')}
          />

          <TextArea
            placeholder='Pokud nám chcete cokoliv sdělit, sem múžete napsat zprávu...'
            label={
              <>
                Text:{' '}
                <span style={{ color: 'lime' }}>
                  {errors.text && errors.text.message}
                </span>
              </>
            }
            rows={5}
            {...register('text')}
          />
          <SubmitWrapper>
            <Input
              style={{ width: '100px' }}
              placeholder='sem kód'
              label={
                <>
                  Opište kód: {currentTimestamp.toString()}{' '}
                  <span style={{ color: 'lime' }}>
                    {errors.antispam_code && errors.antispam_code.message}
                  </span>
                </>
              }
              type='text'
              {...register('antispam_code', {
                valueAsNumber: true,
              })}
              autoComplete='off'
            />
            <Button
              disabled={isPending}
              label={isPending ? 'Odesílám...' : 'Odešli'}
            />
          </SubmitWrapper>
        </form>
      </ContactWrapper>

      <div ref={mapRef}></div>
      <Header>Kudy k nám?</Header>
      <iframe
        style={{ border: 0, marginBottom: '-6px' }}
        src='https://frame.mapy.cz/s/heburamepo'
        width='100%'
        height='400px'
      ></iframe>
    </>
  );
};
