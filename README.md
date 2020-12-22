# Data Spring

> :warning: Data Spring is still very much in an experimental and beta state. As a result, features and implementation likely will change.

Data Spring generates fake datasets geared towards dashboards and data visualizations. Sure a lot of libraries already exist for generating fake data, but I was not able to find a solution that was well tailored for these use cases. Data Spring is designed with the use case of generating datasets for prototyping data driven dashboards and data visualizations. As a result, it is fast and easy to create things like large time series datasets using Data Spring.

Data Spring is available both as a JavaScript library as well as a standalone CLI. Instructions for using both are included below

## data-spring Library

### Getting Started

Install the package using yarn or npm.

```shell
# yarn
yarn add data-spring

#npm
npm install data-spring
```

After installing, add it to your project where you want to generate data. For instance, it can easily be plugged into an API endpoint or directly into a React component. The below snippet gives you the rough idea of usage.

The config argument is how you define the shape of your dataset (i.e. creating fields and possible values for them).

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
    id: "6b41a4ed-6319-4c23-83c7-32eb5a655e7f",
    date: "2020-01-01T01:00:00.000-08:00",
    department: "Environment",
    budget: 45000,
  },
  {
    id: "6b41a4ed-6319-4c23-83c7-32eb5a655e7f",
    date: "2020-01-01T01:00:00.000-08:00",
    department: "Transportation",
    budget: 32000,
  },
  // 22 more records
];
```

## data-spring CLI

### Getting Started

The Data Spring command-line interface (CLI) can be used generate fake datasets from a provided json config file and output the results to a specified json file.

Install the package globally using yarn or npm.

```shell
# yarn
yarn global add data-spring-cli

#npm
npm install data-spring-cli -g
```

Create a `config.json` file in your project that looks something like the following. **Tip:** You can run `data-spring config <config-file>` to generate a boilerplate config file.

The config file is how you define the shape of your dataset (i.e. creating fields and possible values for them).

```json
const config = [
  { "id": "rec_id", "type": "id" },
  {
    "id": "date",
    "type": "date",
    "interval": {
      "type": "month",
      "recordsPerInterval": 2,
    },
    "min": "2020-01-01 00:00:00",
    "max": "2020-12-01 00:00:00",
  },
  {
    "id": "department",
    "type": "string",
    "values": ["Transportation", "Environment", "Health", "Parks"],
  },
  {
    "id": "budget",
    "type": "number",
    "min": 10000,
    "max": 100000,
  },
];
```

Next, run the cli using your config file, passing the path to your config file as well as the path to where you want the data to be output.

```shell
data-spring <config-file> <output-file>
```

That's it! Open up the output file and you should see your generated dataset.

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
