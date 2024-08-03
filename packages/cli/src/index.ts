#!/usr/bin/env node

import { Command } from "commander";
import { initProject, addComponent } from "./commands";

const program = new Command();

program.name("klean-ui").description("CLI for Klean UI").version("0.1.0");

program
  .command("init")
  .description("Initialize a new project with Klean UI")
  .action(initProject);

program
  .command("add <component>")
  .description("Add a component to the project")
  .action(addComponent);

program.parse(process.argv);
