# Data Spring

Generate fake datasets with ease.

## Getting Started

1. Install the library

```shell
npm install data-spring
```

2. Integrate it into your project

The `DataSpring` function is very straight-forward. It expects a configuration argument which as an array of config objects.

```js
const { DataSpring } = require('data-spring');

const config = [
  { id: 'rec_id', type: 'id' },
  {
    id: 'month',
    type: 'date',
    interval: 'month',
    min: '2020-01-01 00:00:00',
    max: '2020-10-01 00:00:00',
  },
  {
    id: 'department',
    type: 'string',
    values: ['Transportation', 'Evironment', 'Health', 'Parks'],
  },
  {
    id: 'budget',
    type: 'number',
    min: 30000,
    max: 100000,
  },
];

// Generate the dataset
const dataset = DataSpring(config);

// expected output will look something like
// [
//   {
//     rec_id: '0eaa8c20-e008-42bd-9675-f922941e9d98',
//     month: '2020-01-01T00:00:00.000-08:00',
//     department: 'Evironment',
//     budget: 62711
//   },
//   {
//     rec_id: '55fb444f-1f6c-41e6-a32b-957c684d33c4',
//     month: '2020-02-01T00:00:00.000-08:00',
//     department: 'Parks',
//     budget: 48522
//   },
//   ...more records
// ]
```
