# EXPENSE TRACKER
This a simple expense tracker commandline application to manage your finances. The application allow users to add, delete, and view their expenses. The application also provide a summary of the expenses.
### COMMANDS ACCEPTED 
1. Use this command to create and expenditure:  `expense-tracker add --description="<description>" --amount="<Number>"`  

2. Use this command to list all expenditures:  `expense-tracker list`  
`# ID  Date       Description  Amount`    
`# 1   2024-08-06  Lunch        $20`    
`# 2   2024-08-06  Dinner       $10`  

3. Use this command to update the amount of an expenditure: `expense-tracker update --id="<Number>" --amount="<Number>"`  

4. Use this command to update the description of an expenditure: `expense-tracker update --id="<Number>" --description="<description>"`  
`# Expense deleted successfully`  

5. Use this command to update both amount and description of an expenditure: `expense-tracker update --id="<Number>" --amount="<Number>"`  

4. Use this command to delete an expenditure: `expense-tracker delete --id="<Number>"`  
`# Expense deleted successfully`  

5. Use this command to get summary of expenditure: `expense-tracker summary`   
`# Total expenses: $30`  

6. Use this command to get a summary of expenditure in a month: `expense-tracker summary --month="<Number>"`   
`# Total expenses for August: $20`  


