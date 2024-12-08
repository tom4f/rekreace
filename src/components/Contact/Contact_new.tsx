import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  SendMessageRequest,
  useSendMessage,
} from '../../features/contact/hooks/useSendMessage';
import './css/contact.css';
import { AlertBox } from '../AlertBox/AlertBox';
import { Modal } from '../Modal/Modal';

export const Contact_new = () => {
  const { mutateAsync, isPending } = useSendMessage();

  const [isModal, setIsModal] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState(
    new Date().getMilliseconds()
  );

  const [alert, setAlert] = useState({ header: '', text: '', color: 'red' });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SendMessageRequest>();

  useEffect(
    () => setValue('antispam_code_orig', currentTimestamp),
    [currentTimestamp, setValue]
  );

  const onSubmit: SubmitHandler<SendMessageRequest> = (formObject) => {
    mutateAsync(formObject, {
      onSuccess: (succesResponse) => {
        setCurrentTimestamp(new Date().getMilliseconds());
        setValue('antispam_code_orig', currentTimestamp);
        setIsModal(true);
        setAlert({
          header: 'V pořádku',
          text: succesResponse.result,
          color: 'lime',
        });
      },
      onError: (errorResponse) => {
        setIsModal(true);
        setAlert({
          header: 'Chyba',
          text: errorResponse.response?.data.result,
          color: 'red',
        });
        setCurrentTimestamp(new Date().getMilliseconds());
      },
    });
  };

  return (
    <>
      {isModal && (
        <Modal
          customStyle={{ width: '500px', height: '300px' }}
          setIsVisible={setIsModal}
          children={
            <>
              <AlertBox alert={alert} />
            </>
          }
        />
      )}
      <header className='header'>
        <b>Kontaktní informace</b>
      </header>
      <article className='address_and_formular'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id='form_kontakt'
          name='form_kontakt'
          autoComplete='off'
        >
          <section className='formular'>
            <div className='adresa'>
              <div>
                Adresa :
                <br />
                <b>Ubytování U Kučerů</b>
                <br />
                <b>Frymburk 73</b>
                <br />
                <b>382 79</b>
              </div>
              <div>
                Internet :
                <br />
                <b>
                  <a href='http://www.LIPNOnet.cz/rekreace'>
                    www.LIPNOnet.cz/rekreace
                  </a>
                </b>
                <br />
                E-mail :
                <br />
                <b>
                  <a href='mailto:ubytovani@lipnonet.cz'>
                    ubytovani@lipnonet.cz
                  </a>
                </b>
              </div>
              <div>
                Telefon :
                <br />
                <b>+420-602496115</b>
                <br />
                Mobil :
                <br />
                <b>+420-724870561</b>
              </div>
            </div>

            <div className='input_booking'>
              <label htmlFor='emailova_adresa'>
                E-mail:{' '}
                <span style={{ color: 'red' }}>
                  {errors.emailova_adresa && errors.emailova_adresa.message}
                </span>
              </label>
              <input
                placeholder='vyplňte svojí e-mailovou adresu'
                id='emailova_adresa'
                type='email'
                {...register('emailova_adresa', {
                  required: 'je nutné vyplnit',
                })}
              />
            </div>

            <div className='input_booking'>
              <label htmlFor='text'>
                Text:{' '}
                <span style={{ color: 'red' }}>
                  {errors.text && errors.text.message}
                </span>
              </label>
              <textarea
                rows={5}
                cols={68}
                placeholder='Pokud nám chcete cokoliv sdělit, sem múžete napsat zprávu...'
                id='text'
                {...register('text', { required: 'je nutné vyplnit' })}
              />
            </div>

            <div className='antispam_booking input_booking'>
              <label htmlFor='antispam_code'>
                Opište kód: {currentTimestamp.toString()}{' '}
                <span style={{ color: 'red' }}>
                  {errors.antispam_code && errors.antispam_code.message}
                </span>
              </label>
              <input
                // required
                id='antispam_code'
                type='text'
                placeholder='sem kód' // Set the placeholder to the current milliseconds
                {...register('antispam_code', {
                  required: 'je nutné vyplnit',
                  valueAsNumber: true,
                })}
              />
            </div>

            <input
              type='hidden'
              {...register('antispam_code_orig', { valueAsNumber: true })}
            />

            <div className='submit_booking'>
              <input
                type='submit'
                disabled={isPending}
                value={isPending ? 'Odesílám...' : 'Odešli'}
              />
            </div>
          </section>
        </form>
      </article>

      <header className='header'>
        <b>Kudy k nám?</b>
      </header>

      <iframe
        title='Kaliště'
        style={{ border: 0, marginBottom: '-6px' }}
        src='https://frame.mapy.cz/s/fehutedezu'
        width='100%'
        height='400px'
      ></iframe>
    </>
  );
};
