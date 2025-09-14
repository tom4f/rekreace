import { Order, QRRequest, SendBookingRequest } from 'src/features/booking';

const commonData = {
  apartment: 0,
  persons: 0,
  check_in: '',
  check_out: '',
  email: '',
  phone: '',
  name: '',
  confirm_via: '',
  address: '',
  info: '',
};

export const newOrderDefaultData: SendBookingRequest = {
  ...commonData,
  antispam_code: 0,
  antispam_code_orig: new Date().getMilliseconds(),
};

export type UpdateBookingRequest = Omit<Order, '__typename'>;

export const updateOrderDefaultData: UpdateBookingRequest = {
  ...commonData,
  id: 0,
  order_status: 'new',
  created_at: '',
  due_date_info: '',
  order_info: '',
  title_prefix: '',
};

export const orderStatusMap = {
  new: 'nová',
  confirmed: 'potvrzeno',
  canceled: 'zrušeno',
  completed: 'uskutečněno',
};

export const orderStatusOptions = Object.entries(orderStatusMap).map(
  ([key, value]) => ({
    value: key,
    label: value,
  })
);

export const defaultQRData: QRRequest = {
  accountPrefix: '000000',
  accountNumber: '0124976013',
  bankCode: '0800',
  amount: 10,
  currency: 'CZ',
  vs: 123,
  message: 'Ubytování u Kučerů ve Frymburku',
};
