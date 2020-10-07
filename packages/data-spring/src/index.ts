const { DateTime, Interval } = require('luxon');

export type FieldTypes = 'date' | 'number' | string;
export type Intervals = 'hour' | 'day' | 'month' | 'year';
export type obj = { [index: string]: any };

export interface iConfig {
  id: string;
  type: FieldTypes;
  interval?: Intervals;
  min?: number | string;
  max?: number | string;
  values?: string[] | number[];
  [index: string]: any;
}

export interface iIntervals {
  milliseconds: string;
  second: string;
  minute: string;
  hour: string;
  day: string;
  week: string;
  month: string;
  quarter: string;
  year: string;
  decade: string;
  [index: string]: string;
}

export const config: iConfig[] = [
  {
    id: 'date',
    type: 'date',
    interval: 'hour',
    min: '2016-01-01 00:00:00',
    max: '2020-12-31 23:59:00',
  },
  { id: 'passengers', type: 'number', min: 0, max: 10 },
  {
    id: 'operator',
    type: 'string',
    values: [
      'Cyan Cab',
      'Teal Cab',
      'Speckled Cab',
      'Orange Cab',
      'Brown Cab',
      'Green Cab',
      'Yellow Cab',
      'Black Cab',
      'Purple Cab',
      'Blue Cab',
      'Clear Cab',
      'Rainbow Cab',
      'White Cab',
      'Red Cab',
      'Grey Cab',
    ],
  },
  { id: 'distance', type: 'number', min: 0, max: 100 },
  { id: 'cost', type: 'number', min: 0, max: 80 },
];

const mappedIntervals: iIntervals = {
  milliseconds: 'milliseconds',
  second: 'seconds',
  minute: 'minutes',
  hour: 'hours',
  day: 'days',
  week: 'weeks',
  month: 'months',
  quarter: 'quarters',
  year: 'years',
  decade: 'decades',
};

/**
 * Utility function used to calculate the total number of
 * ticks that should be included in the dataset
 * @param {string | date} start
 * @param {string | date } end
 * @param {string} intervalBy i.e. day, week, month, year
 * @returns {number} returns the calculated tick count
 */
const calcInterval = (start: string, end: string, intervalBy: Intervals) => {
  if (!start) throw new Error('Please provide a min date');
  if (!end) throw new Error('Please provide a max date');
  if (!intervalBy) throw new Error('Please provide an interval');

  const d1 = DateTime.fromJSDate(new Date(start));
  const d2 = DateTime.fromJSDate(new Date(end));
  const interval = Interval.fromDateTimes(d1, d2);
  return Math.ceil(interval.length(mappedIntervals[intervalBy]));
};

export const DataSpring = (config: iConfig[]) => {
  const dateField = config.find(d => d.type === 'date');
  if (!dateField)
    throw new Error('Please ensure that at least one field is of type date');

  if (dateField) {
    const minDate = dateField.min as string;
    const maxDate = dateField.max as string;
    const interval = dateField.interval;

    const length = calcInterval(
      minDate as string,
      maxDate! as string,
      interval!
    );

    const baseDate = DateTime.fromJSDate(new Date(minDate));

    return Array(length)
      .fill({})
      .map((_, i) => {
        return config.reduce((acc: obj, curr) => {
          if (curr.type === 'date') {
            acc[dateField.id] = baseDate
              .plus({
                [mappedIntervals[dateField.interval!]]: i,
              })
              .toString();
          } else if (curr.type === 'number') {
            const min = +curr.min!;
            const max = +curr.max!;
            acc[curr.id] = Math.floor(Math.random() * (max - min + 1) + min);
          } else if (curr.type === 'string') {
            acc[curr.id] = curr.values![
              Math.floor(Math.random() * curr.values!.length)
            ];
          }
          return acc;
        }, {});
      });
  }
  return [];
};
