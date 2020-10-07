#!/usr/bin/env node
import yargs from "yargs";
import fs from "fs";
import { DataSpring } from "data-spring";

yargs
  .usage("$0 <cmd> [args]")
  .command(
    "generate [configFile] [outputFile]",
    "Generates dataset based on provided config file and outputs to specified output file.",
    (yargs) => {
      yargs.positional("configFile", {
        type: "string",
        describe: "Path to the config file.",
      });
      yargs.positional("outputFile", {
        type: "string",
        describe: "Path to the output file.",
      });
    },
    function (argv) {
      const { configFile, outputFile } = argv;
      const config = fs.readFileSync(configFile as string, {
        encoding: "utf-8",
      });
      const parsedConfig = JSON.parse(config);
      const data = DataSpring(parsedConfig);
      fs.writeFileSync(outputFile as string, JSON.stringify(data));
    }
  )
  .help().argv;
