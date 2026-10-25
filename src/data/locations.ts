import type { Country } from '@/types';

export const COUNTRIES: Country[] = [
  {
    code: 'WW',
    name: 'Worldwide',
    regions: [
      {
        name: 'Global',
        cities: ['Online', 'Mobile', 'Desktop'],
      },
    ],
    pincodes: [
      { code: '00000', area: 'Global Web' },
      { code: '00001', area: 'Global Mobile' },
    ],
  },
  {
    code: 'US',
    name: 'United States',
    regions: [
      { name: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'] },
      { name: 'New York', cities: ['New York City', 'Buffalo', 'Rochester', 'Albany'] },
      { name: 'Texas', cities: ['Houston', 'Dallas', 'Austin', 'San Antonio'] },
      { name: 'Florida', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'] },
      { name: 'Illinois', cities: ['Chicago', 'Springfield', 'Naperville'] },
    ],
    pincodes: [
      { code: '90210', area: 'Beverly Hills, CA' },
      { code: '10001', area: 'New York, NY' },
      { code: '60601', area: 'Chicago, IL' },
      { code: '75001', area: 'Dallas, TX' },
      { code: '33101', area: 'Miami, FL' },
      { code: '94103', area: 'San Francisco, CA' },
    ],
  },
  {
    code: 'IN',
    name: 'India',
    regions: [
      { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'] },
      { name: 'Delhi', cities: ['New Delhi', 'Dwarka', 'Rohini'] },
      { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangaluru'] },
      { name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai'] },
      { name: 'Telangana', cities: ['Hyderabad', 'Warangal'] },
    ],
    pincodes: [
      { code: '400001', area: 'Mumbai, MH' },
      { code: '110001', area: 'New Delhi, DL' },
      { code: '560001', area: 'Bengaluru, KA' },
      { code: '600001', area: 'Chennai, TN' },
      { code: '500001', area: 'Hyderabad, TS' },
      { code: '411001', area: 'Pune, MH' },
    ],
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    regions: [
      { name: 'England', cities: ['London', 'Manchester', 'Birmingham', 'Liverpool'] },
      { name: 'Scotland', cities: ['Edinburgh', 'Glasgow', 'Aberdeen'] },
      { name: 'Wales', cities: ['Cardiff', 'Swansea'] },
    ],
    pincodes: [
      { code: 'SW1A 1AA', area: 'London, England' },
      { code: 'M1 1AE', area: 'Manchester, England' },
      { code: 'EH1 1YZ', area: 'Edinburgh, Scotland' },
    ],
  },
  {
    code: 'JP',
    name: 'Japan',
    regions: [
      { name: 'Tokyo', cities: ['Shibuya', 'Shinjuku', 'Akihabara', 'Ginza'] },
      { name: 'Osaka', cities: ['Osaka City', 'Sakai', 'Higashiosaka'] },
      { name: 'Kyoto', cities: ['Kyoto City', 'Uji'] },
    ],
    pincodes: [
      { code: '100-0001', area: 'Chiyoda, Tokyo' },
      { code: '530-0001', area: 'Osaka City' },
      { code: '600-8001', area: 'Kyoto City' },
    ],
  },
  {
    code: 'DE',
    name: 'Germany',
    regions: [
      { name: 'Bavaria', cities: ['Munich', 'Nuremberg', 'Augsburg'] },
      { name: 'Berlin', cities: ['Berlin', 'Charlottenburg', 'Mitte'] },
      { name: 'Hamburg', cities: ['Hamburg', 'Altona'] },
    ],
    pincodes: [
      { code: '10115', area: 'Berlin, Mitte' },
      { code: '80331', area: 'Munich, Bavaria' },
      { code: '20095', area: 'Hamburg' },
    ],
  },
  {
    code: 'BR',
    name: 'Brazil',
    regions: [
      { name: 'São Paulo', cities: ['São Paulo', 'Campinas', 'Guarulhos'] },
      { name: 'Rio de Janeiro', cities: ['Rio de Janeiro', 'Niterói'] },
    ],
    pincodes: [
      { code: '01000-000', area: 'São Paulo, SP' },
      { code: '20000-000', area: 'Rio de Janeiro, RJ' },
    ],
  },
  {
    code: 'AU',
    name: 'Australia',
    regions: [
      { name: 'New South Wales', cities: ['Sydney', 'Newcastle', 'Wollongong'] },
      { name: 'Victoria', cities: ['Melbourne', 'Geelong'] },
      { name: 'Queensland', cities: ['Brisbane', 'Gold Coast'] },
    ],
    pincodes: [
      { code: '2000', area: 'Sydney, NSW' },
      { code: '3000', area: 'Melbourne, VIC' },
      { code: '4000', area: 'Brisbane, QLD' },
    ],
  },
  {
    code: 'CA',
    name: 'Canada',
    regions: [
      { name: 'Ontario', cities: ['Toronto', 'Ottawa', 'Mississauga'] },
      { name: 'Quebec', cities: ['Montreal', 'Quebec City'] },
      { name: 'British Columbia', cities: ['Vancouver', 'Victoria'] },
    ],
    pincodes: [
      { code: 'M5H 2N2', area: 'Toronto, ON' },
      { code: 'H2Z 1A7', area: 'Montreal, QC' },
      { code: 'V6B 1A1', area: 'Vancouver, BC' },
    ],
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    regions: [
      { name: 'Dubai', cities: ['Dubai', 'Deira', 'Jumeirah'] },
      { name: 'Abu Dhabi', cities: ['Abu Dhabi', 'Al Ain'] },
    ],
    pincodes: [
      { code: '00000', area: 'Dubai (no postal code)' },
      { code: '00000', area: 'Abu Dhabi (no postal code)' },
    ],
  },
];

export const COUNTRY_MAP: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c]),
);

export function suggestPincodes(countryCode: string, q: string) {
  const country = COUNTRY_MAP[countryCode];
  if (!country) return [];
  const query = q.trim().toLowerCase();
  if (!query) return country.pincodes.slice(0, 6);
  return country.pincodes
    .filter(
      (p) =>
        p.code.toLowerCase().includes(query) ||
        p.area.toLowerCase().includes(query),
    )
    .slice(0, 8);
}
