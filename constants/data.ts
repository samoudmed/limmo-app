export interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  image: string;
  latitude: number;
  longitude: number;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment in the City Center',
    address: '123 Main St, Metropolis',
    price: '$1,200,000',
    image: 'https://picsum.photos/seed/property1/400/300',
    latitude: 34.052235,
    longitude: -118.243683,
  },
  {
    id: '2',
    title: 'Cozy Suburban House with a Garden',
    address: '456 Oak Ave, Suburbia',
    price: '$750,000',
    image: 'https://picsum.photos/seed/property2/400/300',
    latitude: 34.152235,
    longitude: -118.343683,
  },
  {
    id: '3',
    title: 'Luxury Villa with a Pool',
    address: '789 Palm Dr, Paradise City',
    price: '$3,500,000',
    image: 'https://picsum.photos/seed/property3/400/300',
    latitude: 34.252235,
    longitude: -118.443683,
  },
  {
    id: '4',
    title: 'Downtown Loft with a View',
    address: '101 Sky High, Metropolis',
    price: '$980,000',
    image: 'https://picsum.photos/seed/property4/400/300',
    latitude: 34.062235,
    longitude: -118.253683,
  },
  {
    id: '5',
    title: 'Charming Cottage in the Countryside',
    address: '21 Green Valley, Rural Town',
    price: '$450,000',
    image: 'https://picsum.photos/seed/property5/400/300',
    latitude: 34.352235,
    longitude: -118.543683,
  },
];
