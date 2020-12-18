#!/usr/bin/env node
const yargonaut = require("yargonaut");
const chalk = yargonaut.chalk();
import yargs from "yargs";
import fs from "fs";
import { DataSpring, iConfig } from "data-spring";

type CreateArgv = {
  configFile: string | number | Buffer | import("url").URL;
  outputFile: string | number | Buffer | import("url").URL;
};
type ConfigArgv = {
  outputFile: string | number | Buffer | import("url").URL;
};

const SampleConfig: iConfig[] = [
  { id: "id", type: "id" },
  {
    id: "date",
    type: "date",
    interval: {
      type: "hour",
    },
    min: "2016-01-01 00:00:00",
    max: "2020-12-31 23:59:00",
  },
  {
    id: "budget",
    type: "number",
    min: 0,
    max: 100,
  },
  {
    id: "department",
    type: "string",
    values: [
      "Environment and Health",
      "Housing",
      "Transportation",
      "Education",
      "Agriculture",
      "Oil and Gas",
      "Parks and Wildlife",
    ],
    min: 0,
    max: 100,
  },
];

yargonaut.style("cyan").errorsStyle("red");

const cli = yargs;

cli
  .scriptName("data-spring")
  .usage(`Usage: $0 <command> [options]`)
  .alias(`h`, `help`)
  .alias(`v`, `version`);

cli
  .command(
    "create <configFile> <outputFile>",
    "Generates dataset based on provided config file and outputs to specified output file.",
    (yargs) => {
      yargs
        .positional("configFile", {
          type: "string",
          describe: "Path to the config file.",
        })
        .positional("outputFile", {
          type: "string",
          describe: "Path to the output file.",
        });
    },
    (argv: CreateArgv) => {
      const { configFile, outputFile } = argv;
      const config = fs.readFileSync(configFile, {
        encoding: "utf-8",
      });
      const parsedConfig = JSON.parse(config);
      const data = DataSpring(parsedConfig);
      fs.writeFileSync(outputFile as string, JSON.stringify(data));
      console.log(chalk.green(`Success! Dataset created`));
    }
  )
  .command(
    "config <outputFile>",
    "Generates a template config file at the specified location.",
    (yargs) => {
      yargs.positional("outputFile", {
        type: "string",
        describe: "Path to the outputted config file.",
      });
    },
    (argv: ConfigArgv) => {
      const { outputFile } = argv;
      fs.writeFileSync(
        outputFile as string,
        JSON.stringify(SampleConfig, null, 2)
      );
      console.log(chalk.green(`Success! Config file created`));
    }
  )
  .help().argv;
