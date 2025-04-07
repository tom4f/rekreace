import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { Order } from 'features/booking';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: '/rekreace/public/fonts/Roboto-Regular.ttf',
      fontWeight: 'normal',
    },
    {
      src: '/rekreace/public/fonts/Roboto-Bold.ttf',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Roboto' },
  section: { marginBottom: 10 },
  textBold: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 12,
  },
  image: { width: 290, height: 290 },
});

type OrderPDFType = { order: Order; qrCodeUrl: string };

export const OrderPDF = ({ order, qrCodeUrl }: OrderPDFType) => {
  const currentYear = new Date().getFullYear();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.textBold}>
            Ubytovací smlouva č.{order.id}/{currentYear}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Order ID: {order.id}</Text>
          <Text style={styles.text}>Customer: {order.name}</Text>
        </View>
        <View style={styles.section}>
          <Text>Thank you for your purchase!</Text>
        </View>
        <Image src={qrCodeUrl} style={styles.image} />
      </Page>
    </Document>
  );
};
