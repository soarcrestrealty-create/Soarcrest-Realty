export interface LeadPayload {
  full_name: string;
  email: string;
  phone: string;
  based_in: 'I\'m in Nigeria' | 'I\'m outside Nigeria' | '';
  country?: string;
  city?: string;
  role?: string;
  services_needed?: string[];
  main_goal: string;
  budget: string;
  pooling?: 'On my own' | 'With others (pooling funds)' | 'Not sure yet' | '';
  pool_size?: number | string;
  timeline?: string;
  areas?: string[];
  property_stage?: string[];
  concerns?: string[];
  notes?: string;
  contact_method?: string;
  preferred_days?: string[];
  preferred_time?: string[];
  timezone?: string;
  heard_from?: string;
  consent: boolean;
  listing_id?: string;
  listing_title?: string;
  source_page: string;
  button_label: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  website?: string; // honeypot
}

export interface PropertyListing {
  listing_id: string;
  published: boolean | string;
  title: string;
  district: string;
  price_ngn: number | string;
  property_type: string;
  bedrooms: number | string;
  size?: string;
  stage: 'Completed' | 'Off-plan';
  inspection_status: 'Inspected, report available' | 'Inspection pending';
  title_status: 'Not yet searched' | 'Search in progress' | 'Solicitor\'s opinion available';
  rent_ngn_per_year?: number | string;
  rent_basis?: 'gross' | 'net';
  rent_status?: 'asking' | 'agreed' | 'achieved';
  thesis: string;
  risk_note?: string;
  image_urls?: string;
  report_url?: string;
  sort_order?: number;
  // Detail page specifics:
  net_income_estimate?: string;
  service_charge?: string;
  condition_summary?: string;
  is_render?: boolean;
}

export type PageRoute = 'home' | 'about' | 'services' | 'properties' | 'contact';
