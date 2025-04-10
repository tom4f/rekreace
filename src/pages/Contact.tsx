import 'components/Contact/css/contact.css';

import { AlertBox } from 'components/AlertBox/AlertBox';
import { Header } from 'components/Atoms';
//import {
// MapLeaflet,
// MapMapLibreGl,
// MapArcGISMap,
//} from 'components/Contact';
import { SendMessageRequest, useSendMessage } from 'features/contact';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useModalStore } from 'src/store';

export const Contact = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const { mutateAsync, isPending } = useSendMessage();

  const openModal = useModalStore((state) => state.openModal);
  const [currentTimestamp, setCurrentTimestamp] = useState(
    new Date().getMilliseconds()
  );

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

  useEffect(() => {
    if (location.hash === '#map' && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const onSubmit: SubmitHandler<SendMessageRequest> = (formObject) => {
    mutateAsync(formObject, {
      onSuccess: (succesResponse) => {
        setCurrentTimestamp(new Date().getMilliseconds());
        setValue('antispam_code_orig', currentTimestamp);
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
        setCurrentTimestamp(new Date().getMilliseconds());
      },
    });
  };

  return (
    <>
      {/* <MapMapLibreGl /> */}
      <Header>Kontaktní informace</Header>
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
                  <a href='https://www.frymburk.com'>www.frymburk.com</a>
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
