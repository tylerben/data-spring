# Data Spring

Data Spring is designed streamline the process of generating fake datasets. Sure a lot of libraries already exist to do this, but I was not able to find a solution that was well tailored to generating large time series datasets. Data Spring is designed with the use case of generating datasets for prototyping data driven dashboards and data visualizations.

Data Spring is available both as a library for use in other applications as well as a standalone CLI. Instructions for using both are included below

## Getting Started with data-spring

Install the package using yarn or npm.

```shell
# yarn
yarn add data-spring

#npm
npm install data-spring
```

After installing, add it to your project where you want to generate data. For instance, it can easily be plugged into an API endpoint or directly into a React component. The below snippet gives you the rough idea.

```js
import { DataSpring } from "data-spring";

// config object that is passed to data spring
// aka how you want your data to look
const config = [
  { id: "rec_id", type: "id" }, // auto generates a uuid
  {
    id: "date",
    type: "date",
    interval: {
      // i.e. 'hour' | 'day' | 'month' | 'year'
      type: "month",
      // # of records to generate before stepping to next interval
      recordsPerInterval: 2,
    },
    min: "2020-01-01 00:00:00",
    max: "2020-12-01 00:00:00",
  },
  {
    id: "department",
    type: "string",
    values: ["Transportation", "Environment", "Health", "Parks"],
  },
  {
    id: "budget",
    type: "number",
    min: 10000,
    max: 100000,
  },
];

const data = DataSpring(config);
```

The above example will generate something that looks roughly like...

```js
[
  {
    "id": "6b41a4ed-6319-4c23-83c7-32eb5a655e7f",
    "date": "2020-01-01T01:00:00.000-08:00",
    "department": "Environment",
    "budget": 45000
  },
  {
    "id": "6b41a4ed-6319-4c23-83c7-32eb5a655e7f",
    "date": "2020-01-01T01:00:00.000-08:00",
    "department": "Transportation",
    "budget": 32000
  }
  // 22 more records
]
```

## Getting Started with data-spring-cli

The Data Spring command-line interface (CLI) can be used to locally generate fake datasets. The CLI reads from a specified JSON config file and spits out the generated JSON data to a specified output file. Reference the config format in the data-spring example above.

Install the package globally using yarn or npm.

```shell
# yarn
yarn global add data-spring-cli

#npm
npm install data-spring-cli -g
```

### CLI Commands

1. create
2. config

#### `create`

```shell
data-spring create <config-file> <output-file>
```

| Argument    | Description                  |
| ----------- | ---------------------------- |
| config-file | Path to the JSON config file |
| output-file | Path to the JSON output file |

#### `config`

```shell
data-spring config <output-file>
```

| Argument    | Description                             |
| ----------- | --------------------------------------- |
| output-file | Path for the generated config JSON file |

#### Examples

- Create a new dataset based on a config file in your current working directory. Output a the dataset in the same directory.

```shell
data-spring create config.json output.json
```

#### `config`

- Create a new config file based off of the starting template called `config.json` in the current working directory.

```shell
data-spring config config.json
```
