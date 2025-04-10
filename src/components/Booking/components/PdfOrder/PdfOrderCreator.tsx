import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { defaultQRData } from 'components/Booking';
import { orderPrice } from 'components/Prices';
import { Order } from 'features/booking';
import houseForPdfSmall from 'images/house-for-pdf-small.jpg';
import { formatedDate } from 'utils';

import RobotoBold from './fonts/Roboto-Bold.ttf';
import RobotoRegular from './fonts/Roboto-Regular.ttf';

export const PdfOrderCreator = ({ order, qrCodeUrl }: OrderPDFType) => {
  const currentYear = new Date().getFullYear();

  const { dayPrice, price, days } = orderPrice(order);

  const checkInDate = formatedDate(new Date(order.check_in));
  const checkOutDate = formatedDate(new Date(order.check_out));
  const today = formatedDate(new Date());

  const dueDate = new Date(order.check_in);
  dueDate.setMonth(dueDate.getMonth() - 1);

  const paymentDueDate = formatedDate(dueDate);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text>
            Ubytovací smlouva č.{order.id}/{currentYear}
          </Text>
        </View>
        <View style={styles.addressWithImage}>
          <Image src={houseForPdfSmall} style={styles.imageMain} />
          <View style={styles.sectionAddress}>
            <Text>Ubytování u Kučerů</Text>
            <Text>38279 Frymburk 73</Text>

            <Text>Tel.: +420 602496115, +420 724870561</Text>
            <Text>
              Web:{' '}
              <Link src='http://www.frymburk.com/rekreace'>
                www.frymburk.com/rekreace
              </Link>
            </Text>
            <Text>
              E-mail:{' '}
              <Link src='mailto: ubytovani@LIPNOnet.cz'>
                ubytovani@LIPNOnet.cz
              </Link>
            </Text>
          </View>
        </View>
        <View style={styles.textRight}>
          <Text>{today}</Text>
        </View>
        <View>
          {order?.title_prefix && <Text>{order.title_prefix}</Text>}
          <Text>{order.name}</Text>
          <Text>{order.address}</Text>
          <Text>
            {'\n'}tel.: {order.phone}
          </Text>
          <Text>e-mail: {order.email}</Text>
          <Text>
            {'\n'}Potvrzujeme tímto, že na základě Vaší žádosti Vás ubytujeme ve
            Vámi požadovaném termínu:
          </Text>
          <Text>- v apartmánu č. {order.apartment}</Text>
          <Text>
            - termín od {checkInDate} do {checkOutDate} (počet dní {days})
          </Text>
          <Text>- počet osob {order.persons}</Text>
          <Text>- cena pro apartmán č.3 je {dayPrice},-Kč/den</Text>
          <Text>
            {'\n'}Cena ubytování za celý pobyt je {days} x {dayPrice} = {price}
            ,- Kč
          </Text>
        </View>
        <View style={styles.paymentWithQRCode}>
          <View>
            <Text>
              <Text style={{ color: 'red' }}>
                Zaplaťte převodem na účet č.:
              </Text>
              {'\n'}
              {defaultQRData.accountPrefix}-{defaultQRData.accountNumber}/
              {defaultQRData.bankCode}
              {'\n'}
              variabilní symbol: {order.id}
              {'\n'}
              částka: {price},- Kč
              {'\n'}
              {`splatnost: ${order?.due_date_info || paymentDueDate}`}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {'\n'}Storno poplatky při pozdějším zrušení rekreace
              {'\n'}jsou uvedeny na adrese{' '}
              <Link src='http://www.frymburk.com/rekreace/ceny'>
                www.frymburk.com/rekreace/ceny
              </Link>
            </Text>
          </View>
          <Image src={qrCodeUrl} style={styles.imageQRCode} />
        </View>
        <View style={styles.textRight}>
          <Text>
            {' '}
            S pozdravem ……………………………
            {'\n'}Marie Kučerová
          </Text>
        </View>
        <View>
          <Text>
            {'\n'}
            {'\n'}Pozn.: ubytovat se můžete v den příjezdu po 15.00 hod a
            rekreace končí v den odjezdu v 10.00 hod. Uložení kol je zajištěno v
            „kolárně“ a parkování je na parkovišti v objektu. Cestu k nám
            najdete na adrese{' '}
            <Link src='http://www.frymburk.com/rekreace/kontakt#map'>
              www.frymburk.com/rekreace/kontakt
            </Link>
            {'\n'}
            {'\n'}
            {order?.order_info ?? ''}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: RobotoRegular,
      fontWeight: 'normal',
    },
    {
      src: RobotoBold,
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 50,
    paddingVertical: 30,
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'normal',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 25,
    textAlign: 'center',
  },
  addressWithImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  imageMain: { width: 100, marginRight: 50 },
  sectionAddress: {
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  paymentWithQRCode: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    marginBottom: 50,
    fontSize: 16,
  },
  imageQRCode: { width: 145, height: 145 },
  textBold: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

type OrderPDFType = { order: Order; qrCodeUrl: string };
