# data-spring-cli

The Data Spring command-line interface (CLI) can be used to locally generate fake datasets. The CLI reads from a specified JSON config file and spits out the generated JSON data to a specified output file.

## CLI Commands

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
data-spring create config.json
```
