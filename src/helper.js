import fs from 'fs'
import path from "path";
import { cwd } from "process";
import Table from 'cli-table3';
const fullPath = path.resolve(cwd(), "db.json")
let expenseData = []
try{
    expenseData = JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
}catch(err){
    console.log("Error: ", err.message)
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
  const expenseId = expenseData.length === 0 ? 1 : expenseData.length + 1;
  const newExpex = {
    id: expenseId,
    description: opts.description,
    amount: opts.amount,
    date: new Date(Date.now()).toISOString(),
  };

  expenseData.push(newExpex);

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
        head:["ID", "Date", "Description","Amount"],
        colWidths: [5, 35,30,10]
    });

    expenseData.forEach(el =>{
        table.push([el.id,el.date,el.description,el.amount])
    })
    console.log(table.toString())
    process.exit(1)
}