import fs from "fs";
import path from "path";
import { cwd } from "process";
import Table from "cli-table3";

const fullPath = path.resolve(cwd(), "db.json");
let expenseData = [];
try {
  expenseData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
} catch (err) {
  console.log("Error: ", err.message);
}

export const addExpenditure = (opts) => {
  const amount = parseInt(opts.amount);
  if (!opts.description) {
    console.log("An expense must have a description");
    process.exit(1);
  }
  // console.log("An expense must have a description");

  if (!opts.amount) {
    console.log("An expense must have an amount");
    process.exit(1);
  }

  if (Number.isNaN(amount)) {
    console.log("Amount must be a number");
    process.exit(1);
  }
  const expenseId =
    expenseData.length === 0 ? 1 : expenseData[expenseData.length - 1].id + 1;
  const newExpens = {
    id: expenseId,
    description: opts.description,
    amount: opts.amount,
    date: new Date(Date.now()).toISOString(),
    updated_at: null,
  };

  //adding to db
  expenseData.push(newExpens);

  try {
    fs.writeFileSync(fullPath, JSON.stringify(expenseData));
    console.log("Expense added successfully!");
    process.exit(1);
  } catch (err) {
    console.log("Error: ", err.message);
    process.exit(1);
  }
};

export const listExpenses = () => {
  const table = new Table({
    head: ["ID", "Date", "Description", "Amount"],
    colWidths: [5, 35, 30, 10],
  });

  expenseData.forEach((el) => {
    table.push([el.id, el.date, el.description, el.amount]);
  });
  console.log(table.toString());
  process.exit(1);
};

export const summarizeExpenses = (opts) => {
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  let totalExpenses = 0;
  if (opts.month) {
    const month = parseInt(opts.month);
    if (isNaN(month)) {
      console.log("Please the month must be a number");
      process.exit(1);
    }

    if (month <= 0 || month > 12) {
      console.log("Month must be from 1 to 12");
      process.exit(1);
    }

    const monthlyExpenseData = expenseData.filter((el) =>
      el.date.includes(`${month > 9 ? "" : 0}${month}`)
    );

    monthlyExpenseData.forEach((el) => {
      totalExpenses += parseInt(el.amount);
    });

    console.log(`Total expenses for ${months[month]}: $${totalExpenses}`);
    process.exit(1);
  }

  expenseData.forEach((el) => {
    totalExpenses += parseInt(el.amount);
  });

  console.log(`Total expenses: $${totalExpenses}`);
  process.exit(1);
};

export const updateExpenditure = (opts) => {
  if (!opts.id) {
    console.log("provide the id of the expenditure you want to update");
    process.exit(1);
  }

  const expId = parseInt(opts.id);
  let amount = 0;

  if (isNaN(expId)) {
    console.log("Id must be a number");
    process.exit(1);
  }

  let expense = expenseData.find((el) => el.id === expId);
  if (!expense) {
    console.log(`No expenditure found with Id ${expId}`);
  }

  if (opts.amount) {
    amount = parseInt(opts.amount);
    if (isNaN(amount)) {
      console.log("Amount must be a number");
      process.exit(1);
    }

    if (amount < 0) {
      console.log("Amount can't be less than 0");
      process.exit(1);
    }

    expense.amount = amount;
  }

  if (opts.description) {
    expense.description = opts.description;
  }

  expenseData = expenseData.map((el) => {
    if (el.id === expId) {
      expense.updated_at = new Date(Date.now()).toISOString();
      return expense;
    }
    return el;
  });

  try {
    fs.writeFileSync(fullPath, JSON.stringify(expenseData));
    console.log(`Expenditure with Id ${expId} has been updated successfully`);
    process.exit(1);
  } catch (err) {
    consol.log("Error: ", err.message);
    process.exit(1);
  }
};

export const deleteExpenditure = (opts) => {
  if (!opts.id) {
    console.log("provide the id of the expenditure you want to update");
    process.exit(1);
  }

  const expId = parseInt(opts.id);

  if (isNaN(expId)) {
    console.log("Id must be a number");
    process.exit(1);
  }

  let expense = expenseData.find((el) => el.id === expId);
  if (!expense) {
    console.log(`No expenditure found with id: ${opts.id}`);
    process.exit(1);
  }

  expenseData = expenseData.filter((el) => el.id !== parseInt(opts.id));

  try {
    fs.writeFileSync(fullPath, JSON.stringify(expenseData));
    console.log(`Expenditure with Id ${opts.id} has been deleted successfully`);
    process.exit(1);
  } catch (err) {
    consol.log("Error: ", err.message);
    process.exit(1);
  }
};
