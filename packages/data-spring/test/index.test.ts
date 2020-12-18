import { DataSpring, iConfig } from '../src/index';

const Brands = ['4FRNT', 'Blizzard', 'Moment', 'JSkis'];
const Models = [
  'Hoji',
  'Renegade',
  'Bonafide',
  'Black Pearl',
  'Sick Day',
  'Brahma',
  'Raven',
];

const config: iConfig[] = [
  { id: 'id', type: 'id' },
  {
    id: 'date',
    type: 'date',
    interval: 'hour',
    recordsPerInterval: 5,
    min: '2016-01-01 00:00:00',
    max: '2016-01-01 02:00:00',
  },
  {
    id: 'brand',
    type: 'string',
    values: Brands,
  },
  {
    id: 'model',
    type: 'string',
    values: Models,
  },
  { id: 'price', type: 'number', min: 400, max: 600 },
  { id: 'quantity', type: 'number', min: 1, max: 4 },
];

let data: any;

describe('Basic config', () => {
  beforeAll(() => {
    data = DataSpring(config);
  });

  test('should return data of the correct length', () => {
    expect(data.length).toBe(15);
  });
  test('should return data with a proper id', () => {
    expect(typeof data[0].id).toBe('string');
    expect(data[0].id.length).toBe(36);
  });
  test('should return data with the correct start and end date', () => {
    expect(data[0].date).toBe('2016-01-01T00:00:00.000-08:00');
    expect(data[1].date).toBe('2016-01-01T00:00:00.000-08:00');
    expect(data[2].date).toBe('2016-01-01T00:00:00.000-08:00');
    expect(data[3].date).toBe('2016-01-01T00:00:00.000-08:00');
    expect(data[4].date).toBe('2016-01-01T00:00:00.000-08:00');
    expect(data[14].date).toBe('2016-01-01T02:00:00.000-08:00');
  });
  test('should return data with one of the provided values for value fields', () => {
    expect(data[0].model).toBeOneOf(Models);
    expect(data[0].brand).toBeOneOf(Brands);
  });
  test('should return data within the min and max bounds for number fields', () => {
    expect(data[0].price).toBeWithin(400, 601);
    expect(data[0].quantity).toBeWithin(1, 5);
  });
});
