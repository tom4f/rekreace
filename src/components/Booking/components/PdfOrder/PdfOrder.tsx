import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useGetQRUrl } from 'features/booking';
import { useOrder } from 'src/features/booking';

import { defaultQRData } from '../Form';
import { OrderPDF } from './PdfOrderCreator';

// Download link
export const PdfOrderDownload = () => {
  const orderData = useOrder();
  const { data: qrCodeUrl, isSuccess } = useGetQRUrl(defaultQRData);

  if (!orderData || !Object.keys(orderData).length || !isSuccess) return;

  return (
    <>
      <h2>Preview</h2>
      <PDFViewer width='100%' height='600'>
        <OrderPDF order={orderData} qrCodeUrl={qrCodeUrl} />
      </PDFViewer>

      <h2>Download</h2>
      <PDFDownloadLink
        document={<OrderPDF order={orderData} qrCodeUrl={qrCodeUrl} />}
        fileName='order-summary.pdf'
      >
        {({ loading }) => (loading ? 'Preparing...' : 'Download PDF')}
      </PDFDownloadLink>
    </>
  );
};
