export interface Order {
  order_no: string;
  created_at: string;
  user_uuid: string;
  user_email: string;
  amount: number;
  interval: string;
  expired_at: string;
  status: string;
  credits: number;
  currency: string;
  order_detail?: string;
  paid_at?: string;
  paid_email?: string;
  paid_detail?: string;
}
