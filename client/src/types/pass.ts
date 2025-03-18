interface BasePass {
  pk: number;
  created_at: string;
  updated_at: string;
  expires_at: string;
  serial_number: string;
  qr_image: string;
}

export interface CardVM extends BasePass {
  last_used_at: string;
}

export interface TicketVM extends BasePass {
  is_used: boolean;
}
