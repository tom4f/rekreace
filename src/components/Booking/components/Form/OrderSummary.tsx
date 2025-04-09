import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { Button, Header } from 'src/components/Atoms';
import { orderPrice } from 'src/components/Prices';
import { SendBookingRequest } from 'src/features/booking';
import { useSendBookingGraphQL } from 'src/features/booking/hooks/useSendBookingGraphQL';

const apartmentNames = [
  'Apartmá č.1 - přízemí 35m²',
  'Apartmá č.2 - přízemí 30m²',
  'Apartmá č.3 - podkroví 60m²',
];

type Props = {
  formData: SendBookingRequest;
  onSuccess?: (message: string) => void;
  onError?: (error: Error) => void;
};

export const OrderSummary: React.FC<Props> = ({
  formData,
  onSuccess,
  onError,
}) => {
  const [sendBooking, { data: odrerResponse, error }] = useSendBookingGraphQL();

  useEffect(() => {
    if (error && onError) {
      onError(error instanceof Error ? error : new Error('Neznámá chyba'));
    }

    if (odrerResponse?.sendBooking.message && onSuccess) {
      onSuccess(odrerResponse.sendBooking.message);
    }
  }, [error, odrerResponse, onError, onSuccess]);

  const apartmentName =
    apartmentNames[formData.apartment - 1] ?? 'Neznámý apartmán';

  return (
    <StyledOrderSummary>
      <Header>Souhrn rezervace</Header>
      <ul>
        <li>
          Apartmán: <b>{apartmentName}</b>
        </li>
        <li>
          Počet osob: <b>{formData.persons}</b>
        </li>
        <li>
          Termín:{' '}
          <b>
            {formData.check_in} – {formData.check_out}
          </b>
        </li>
        <li>
          Cena: <b>{orderPrice(formData).price || '?'} Kč</b>
        </li>
        <li>
          Jméno: <b>{formData.name}</b>
        </li>
        <li>
          Email: <b>{formData.email}</b>
        </li>
        <li>
          Telefon: <b>{formData.phone}</b>
        </li>
        <li>
          Potvrdit přes: <b>{formData.confirm_via}</b>
        </li>
        <li>
          Adresa: <b>{formData.address}</b>
        </li>
        <li>
          Poznámka: <b>{formData.info || '—'}</b>
        </li>
      </ul>
      <Button
        label='Odeslat objednávku'
        onClick={() => sendBooking({ variables: { input: formData } })}
      />
    </StyledOrderSummary>
  );
};

const StyledOrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: fit-content;
  margin: 20px auto;
  color: lime;
`;
