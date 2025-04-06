import { Order, SendBookingRequest } from 'src/features/booking';

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

export const updateOrderDefaultData: Order = {
  ...commonData,
  id: 0,
  order_status: 'new',
  created_at: '',
  __typename: '',
};
