#!/usr/bin/env node
import { Command } from "commander";
import { addExpense } from "./helper.js";


const program = new Command();
program.exitOverride()

program
  .name("expense-tracker")
  .description("An application to track expenses")
  .version("1.0.0");

//Creating an expenditure
program
  .command("add")
  .option("--description <description>", "Add a description to the expense")
  .option("--amount <amount>", "An expense must have an amount")
  .action((opts) => {
    addExpense(opts)
  });

  program.parse()
