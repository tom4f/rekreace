import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Header, Input } from 'src/components/Atoms';
import { orderPrice } from 'src/components/Prices';
import { QRRequest, useGetQRUrl, useOrder } from 'src/features/booking';

const defaultQRData: QRRequest = {
  accountPrefix: '000000',
  accountNumber: '0124976013',
  bankCode: '0800',
  amount: 10,
  currency: 'CZ',
  date: '2025-04-30',
  vs: 123,
  message: 'testovaci platba',
  size: 10,
};

export const QRCode = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm<QRRequest>({
    defaultValues: defaultQRData,
  });
  const orderDataForUpdate = useOrder();
  const [qRData, setQRData] = useState<QRRequest>(defaultQRData);

  const { data: imageUrl, isSuccess, isError, isLoading } = useGetQRUrl(qRData);

  const onSubmit = (data: QRRequest) => {
    setQRData(data);
  };

  useEffect(() => {
    if (!orderDataForUpdate) return;
    const orderPriceValue = orderPrice(orderDataForUpdate);

    const updatedQRData = {
      ...defaultQRData,
      amount: orderPriceValue,
    };

    setQRData(updatedQRData);
    reset(updatedQRData); // 👈 update form values too
  }, [orderDataForUpdate, reset]);

  return (
    <>
      <Header>QR kód</Header>
      <StyledQRCode onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <BankAccount>
            <Input label='prefix' {...register('accountPrefix')} />
            <Input
              label='číslo účtu'
              {...register('accountNumber', { required: true })}
            />
            {errors.accountNumber && <span>This field is required</span>}

            <Input
              label='kód banky'
              {...register('bankCode', { required: true })}
            />
          </BankAccount>
          <MessageWrapper>
            <Input label='zpráva' {...register('message')} />
          </MessageWrapper>
          <ButtonWrapper>
            <Input
              label='částka v Kč'
              {...register('amount', { required: true, min: 1 })}
            />

            <Input label='VS' {...register('vs')} />
            <Button style={{ width: '100%' }} label='Vytvoř QR kód' />
          </ButtonWrapper>
        </FormWrapper>
        <ImageWrapper>
          {isLoading && <>loading...</>}
          {isError && <>Error</>}
          {isSuccess && <img src={imageUrl} alt='QR Code' />}
        </ImageWrapper>
      </StyledQRCode>
    </>
  );
};

const StyledQRCode = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  padding: 20px;
  background-color: brown;
  max-width: 500px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ImageWrapper = styled.div`
  margin: 20px auto;
  width: 232px;
  height: 232px;
`;

const BankAccount = styled.div`
  display: flex;
  flex-direction: row;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;
