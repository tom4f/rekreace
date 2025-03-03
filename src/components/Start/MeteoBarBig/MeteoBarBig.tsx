import { Header } from 'components/Atoms';
import { useGetDavis, useGetLipno } from 'features/meteo';
import { Link } from 'react-router-dom';
import { useWebCamStore } from 'store';
import styled from 'styled-components';
import { getDateParts } from 'utils';

import { DavisMeteoBar, LipnoMeteoBar } from '.';

export const MeteoBarBig = () => {
  const {
    webCam: { day: webCamDay, month: webCamMonth },
  } = useWebCamStore();

  const sliderToDavisDate = `${new Date().getFullYear()}-${webCamMonth}-${webCamDay}`;

  const {
    data: davisSpecificDateData,
    isSuccess: isDavisSuccess,
    isFetching: isDavisFetching,
    isError: isDavisError,
  } = useGetDavis({
    startDate: sliderToDavisDate,
    endDate: sliderToDavisDate,
    requestType: 'date',
    orderBy: 'date',
    sort: 'DESC',
    refetchInterval: 10000,
  });

  const { data: davisLatestData } = useGetDavis({
    start: 0,
    limit: 1,
    requestType: 'amount',
    orderBy: 'date',
    sort: 'DESC',
    enabled: (isDavisSuccess && !davisSpecificDateData?.length) || isDavisError,
  });

  const {
    data: lipnoSpecificDateData,
    isSuccess: isLipnoSuccess,
    isError: isLipnoError,
  } = useGetLipno({
    startDate: sliderToDavisDate,
    endDate: sliderToDavisDate,
    requestType: 'date',
    orderBy: 'datum',
    sort: 'DESC',
  });

  const { data: lipnoLatestData } = useGetLipno({
    start: 0,
    limit: 1,
    requestType: 'amount',
    orderBy: 'datum',
    sort: 'DESC',
    enabled: (isLipnoSuccess && !lipnoSpecificDateData?.length) || isLipnoError,
  });

  const davisData =
    (davisSpecificDateData &&
      davisSpecificDateData?.length > 0 &&
      davisSpecificDateData[0].date &&
      davisSpecificDateData[0]) ||
    (davisLatestData &&
      davisLatestData?.length > 0 &&
      davisLatestData[0].date &&
      davisLatestData[0]);

  const lipnoData =
    (lipnoSpecificDateData &&
      lipnoSpecificDateData?.length > 0 &&
      lipnoSpecificDateData[0].datum &&
      lipnoSpecificDateData[0]) ||
    (lipnoLatestData &&
      lipnoLatestData?.length > 0 &&
      lipnoLatestData[0].datum &&
      lipnoLatestData[0]);

  const dateParts =
    davisData && davisData?.date && getDateParts(new Date(davisData.date));

  return (
    <>
      <Header>
        <Link to='/meteostanice'>
          <FadeInText $isFetching={isDavisFetching}>
            METEOSTANICE{' '}
            {dateParts && (
              <>
                {dateParts.day}.{dateParts.month}.{dateParts.year}
              </>
            )}
          </FadeInText>
        </Link>
      </Header>
      <MainSection>
        {!davisData && !lipnoData && (
          <div style={{ color: 'white' }}>Loading...</div>
        )}
        {davisData && <DavisMeteoBar davisData={davisData} />}
        {lipnoData && <LipnoMeteoBar lipnoData={lipnoData} />}
      </MainSection>
    </>
  );
};

const FadeInText = styled.span<{ $isFetching: boolean }>`
  animation: ${({ $isFetching }) => ($isFetching ? 'fadeOut 2s' : 'fadeIn 2s')};

  @keyframes fadeIn {
    0% {
      color: lime;
    }
    100% {
      color: white;
    }
  }

  @keyframes fadeOut {
    0% {
      color: white;
    }
    100% {
      color: lime;
    }
  }
`;

const MainSection = styled.section`
  color: white;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;
