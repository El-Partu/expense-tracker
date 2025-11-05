#!/usr/bin/env node
import { Command } from "commander";
import {
  addExpenditure,
  deleteExpenditure,
  listExpenses,
  summarizeExpenses,
  updateExpenditure,
} from "./helper.js";

const program = new Command();
program.exitOverride();

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
    addExpenditure(opts);
  });

//Listing expenses
program.command("list").action(() => {
  listExpenses();
});

//Get summary of expenses
program
  .command("summary")
  .option("--month <month>", "total expenses in a month")
  .action((opts) => {
    summarizeExpenses(opts);
  });

//Update an expenditure
program
  .command("update")
  .option("--id <id>", "Id of expenditureo")
  .option("--description <description>", "Add a description to the expense")
  .option("--amount <amount>", "An expense must have an amount")
  .action((opts) => {
    updateExpenditure(opts);
  });

//Delete an expenditure
program
  .command("delete")
  .option("--id <id>", "Id of expenditure")
  .action((opts) => {
    deleteExpenditure(opts);
  });

program.parse();
