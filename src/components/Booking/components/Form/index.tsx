import { useState } from 'react';
import './css/formular.css';
import { useSendBooking } from '../../../../features/booking';
import { Modal } from '../../../Modal/Modal';
import { AlertBox } from '../../../AlertBox/AlertBox';

export const Form = () => {
  const { mutateAsync } = useSendBooking();

  const [alert, setAlert] = useState({ header: '', text: '', color: 'red' });

  const [isModal, setIsModal] = useState(false);

  const [formData, setFormData] = useState({
    apartment: '',
    persons: '',
    check_in: '',
    check_out: '',
    email: '',
    phone: '',
    name: '',
    confirm_via: '',
    address: '',
    info: '',
    antispam_code: 0,
    antispam_code_orig: new Date().getMilliseconds(),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync(formData, {
      onSuccess: (succesResponse) => {
        setFormData((old) => ({
          ...old,
          antispam_code_orig: new Date().getMilliseconds(),
        }));
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
        setFormData((old) => ({
          ...old,
          antispam_code_orig: new Date().getMilliseconds(),
        }));
      },
    });
  };

  return (
    <div id='1'>
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
      <form
        autoComplete='off'
        onSubmit={(e) => onSubmit(e)}
        id='form_booking'
        name='form_booking'
      >
        <div className='header'>
          <b>Závazná objednávka ubytování</b>
        </div>
        <div className='booking_form'>
          <div className='input_booking'>
            <label>Apartmán číslo :</label>
            <select
              value={formData.apartment}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  apartment: e.target.value,
                }))
              }
              name='apartment'
              required
            >
              <option value=''>vyberte zde</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>
          </div>

          <div className='input_booking'>
            <label>Počet osob :</label>
            <br />
            <select
              value={formData.persons}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  persons: e.target.value,
                }))
              }
              name='persons'
              required
            >
              <option value=''>vyberte zde</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>

          <div className='input_booking'>
            <label>Datum příjezdu :</label>
            <br />
            <input
              value={formData.check_in}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  check_in: e.target.value,
                }))
              }
              type='date'
              name='check_in'
              required
            />
          </div>

          <div className='input_booking'>
            <label>Datum odjezdu :</label>
            <br />
            <input
              value={formData.check_out}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  check_out: e.target.value,
                }))
              }
              type='date'
              name='check_out'
              required
            />
          </div>

          <div className='input_booking'>
            <label>E-mail :</label>
            <br />
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  email: e.target.value,
                }))
              }
              type='email'
              name='email'
              placeholder='vyplňte zde'
              required
            />
          </div>

          <div className='input_booking'>
            <label>Telefon :</label>
            <br />
            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  phone: e.target.value,
                }))
              }
              type='tel'
              name='phone'
              minLength={9}
              placeholder='vyplňte zde'
              required
            />
          </div>

          <div className='input_booking'>
            <label>Jméno a příjmení :</label>
            <br />
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  name: e.target.value,
                }))
              }
              type='text'
              name='name'
              placeholder='vyplňte zde'
              required
            />
          </div>

          <div className='input_booking'>
            <label>Odpovědět :</label>
            <br />
            <select
              value={formData.confirm_via}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  confirm_via: e.target.value,
                }))
              }
              name='confirm_via'
              required
            >
              <option value=''>vyberte</option>
              <option value='telefonem'>telefonem</option>
              <option value='emailem'>emailem</option>
            </select>
          </div>

          <div className='input_booking'>
            <label>Adresa :</label>
            <br />
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  address: e.target.value,
                }))
              }
              name='address'
              rows={4}
              cols={68}
              wrap='Yes'
              placeholder='Váše adresa'
              required
            ></textarea>
          </div>

          <div className='input_booking'>
            <label>Váš komentář</label>
            <br />
            <textarea
              value={formData.info}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  info: e.target.value,
                }))
              }
              name='info'
              rows={4}
              cols={68}
              wrap='Yes'
              placeholder='napište nám...'
            ></textarea>
          </div>

          <input
            id='antispam_code_orig'
            type='hidden'
            name='antispam_code_orig'
            value={formData.antispam_code_orig}
          />
          <div className='antispam_booking input_booking'>
            <label id='antispam_code_label'>
              Opište kód : {formData.antispam_code_orig}
            </label>
            <input
              value={formData.antispam_code || ''}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  antispam_code: +e.target.value,
                }))
              }
              id='antispam_code_input'
              type='number'
              name='antispam_code'
              size={5}
              placeholder='sem kód'
            />
          </div>

          <div className='submit_booking'>
            <input type='submit' name='odesli' value='Odeslat' />
          </div>
        </div>
      </form>
    </div>
  );
};
