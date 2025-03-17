import { CardVM, TicketVM } from "./pass";

export interface ProfileVM {
  id: number;
  profile_image?: string | null;
  ucn: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string | null;
  phone_number?: string | null;
  status: string;
  document?: string | null;
  card?: CardVM | null;
  tickets?: TicketVM[] | null;
  balance?: number | null;
}

export interface ProfileUM {
  ucn: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  status: string;
}
