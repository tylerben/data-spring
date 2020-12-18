const { DateTime, Interval } = require('luxon');
const { v4: uuidv4 } = require('uuid');

export type FieldTypes = 'date' | 'number' | string;
export type Intervals = 'hour' | 'day' | 'month' | 'year';
export type obj = { [index: string]: any };

export interface iConfig {
  id: string;
  type: FieldTypes;
  interval?: Intervals;
  recordsPerInterval?: number;
  min?: number | string;
  max?: number | string;
  values?: string[] | number[];
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
    const recPerInterval = dateField.recordsPerInterval || 1;

    const length = calcInterval(
      minDate as string,
      maxDate! as string,
      interval!
    );

    const baseDate = DateTime.fromJSDate(new Date(minDate));
    let counter = 0;
    return Array((length + 1) * recPerInterval)
      .fill({})
      .map((_, i) => {
        if (i !== 0 && i % recPerInterval === 0) counter = counter + 1;
        return config.reduce((acc: obj, curr) => {
          if (curr.type === 'id') {
            acc[curr.id] = uuidv4();
          } else if (curr.type === 'date') {
            acc[dateField.id] = baseDate
              .plus({
                [mappedIntervals[dateField.interval!]]: counter,
              })
              .toString();
          } else if (curr.type === 'number') {
            const min = +curr.min!;
            const max = +curr.max!;
            if (min === 0 && max === 1) {
              const val = Math.random();
              acc[curr.id] = val;
            } else {
              const val = Math.random() * (max - min + 1) + min;
              acc[curr.id] = Math.floor(val);
            }
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
