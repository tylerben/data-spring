const { DataSpring, iConfig } = require('./../../dist');

const config: typeof iConfig[] = [
  { id: 'id', type: 'id' },
  {
    id: 'date',
    type: 'date',
    interval: 'hour',
    min: '2016-01-01 00:00:00',
    max: '2020-12-31 23:59:00',
  },
  { id: 'dept_members', type: 'number', min: 0, max: 80 },
  {
    id: 'department',
    type: 'string',
    values: [
      'Environment and Health',
      'Housing',
      'Transportation',
      'Education',
      'Agriculture',
      'Oil and Gas',
      'Parks and Wildlife',
    ],
  },
  { id: 'budget', type: 'number', min: 10000000, max: 100000000 },
  { id: 'budget_pct_increase', type: 'number', min: 1, max: 1000 },
  { id: 'budget_share', type: 'number', min: 0, max: 1 },
];

const data = DataSpring(config);
console.log(data);
