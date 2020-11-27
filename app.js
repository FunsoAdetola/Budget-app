
  let budgetFeedback = document.querySelector(".budget-feedback");
  let expenseFeedback = document.querySelector(".expense-feedback");
  let budgetForm = document.querySelector("#budget-form");
  let budgetInput = document.querySelector("#budget-input");
  let budgetAmount = document.querySelector("#budget-amount");
  let expenseAmount = document.querySelector("#expense-amount");
  let balance = document.querySelector("#balance");
  let balanceAmount = document.querySelector("#balance-amount");
  let expenseForm = document.querySelector("#expense-form");
  let expenseInput = document.querySelector("#expense-input");
  let priorityInput = document.querySelector("#priority-input");
  let expenseList = document.querySelector("#expense-list");
  let calculateBudget = document.querySelector("#budget-submit");
  let itemList = [];
  let itemID = 0;

  function submitBudgetForm(){

  const value = budgetInput.value;
  if (value === "" || value < 0) {
    budgetFeedback.classList.add("showItem");
    budgetFeedback.innerHTML = `<p>value cannot be empty or less than zer0</p>`;
      setTimeout(function(){
      budgetFeedback.classList.remove("showItem");
   }, 4000);
  } else{
    budgetAmount.textContent = value;
    budgetInput.value = "";
  }
}
  // show balance


 function submitExpenseForm(){
   const expenseValue = expenseInput.value;
  const priorityValue = priorityInput.value;

  if (expenseValue === "" || priorityValue === "" || priorityValue < 0){
    expenseFeedback.classList.add("showItem");
    expenseFeedback.innerHTML = `<p>Value cannot be empty or less than zero</p>`;
    setTimeout(function(){
    expenseFeedback.classList.remove("showItem")
  }, 4000);
} else if (priorityValue < 1 || priorityValue>3){
    expenseFeedback.classList.add("showItem");
    expenseFeedback.innerHTML = `<p>Priority cannot be less than 1 or greater than 3</p>`;
    setTimeout(function(){
    expenseFeedback.classList.remove("showItem")
  }, 4000);
} else{
    let priority = parseInt(priorityValue);
    let itemAmount;
    expenseFeedback.classList.add("showItem");
    expenseFeedback.innerHTML = `<p>Expense Saved</p>`;
    setTimeout(function(){
    expenseFeedback.classList.remove("showItem")
    }, 4000);
    expenseInput.value = "";
    priorityInput.value ="";

     if(priority === 1){
       itemAmount = parseInt(budgetAmount.textContent) * 0.3;
     }
      if(priority === 2){
      itemAmount = parseInt(budgetAmount.textContent) * 0.2;

      }
      if(priority === 3){
        itemAmount= parseInt(budgetAmount.textContent) * 0.1;
       }

    let expense = {
      id: itemID,
      title: expenseValue,
      priority:priority,
      amount: itemAmount
    }
    itemID++;
    itemList.push(expense);
    addExpense(expense);
    console.log(itemList);


  }
}

// add expense
function addExpense(expense){
  calculateBudget.addEventListener("click", function(){
    const div = document.createElement('div');
    div.classList.add("expense");
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">-${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">${expense.priority}</h5>
    <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
   </div>`;
   expenseList.appendChild(div);
    showBalance();
 });

}
function showBalance(){
 const expense = totalExpense();
 const total = parseInt(budgetAmount.textContent) - expense;
 balanceAmount.textContent = total;
  
}


function totalExpense(){
  let total = 0;
  if(itemList.length>0){
   total = itemList.reduce(function(accumulator,current){
   accumulator += current.amount;
   return accumulator;
   },0)
  }
 expenseAmount.textContent = total;
  return total;
}




 function eventListeners(){
   const budgetForm = document.querySelector("#budget-form");
   const expenseForm = document.querySelector("#expense-form");
   const expenseList = document.querySelector("#expense-list");

 // new instance of Ui class


 // budget form
 budgetForm.addEventListener("submit", function(event){
   event.preventDefault();
   submitBudgetForm();

 });
 // expense form
 expenseForm.addEventListener("submit", function(event){
   event.preventDefault();
   submitExpenseForm();
 });
 // expense list
 expenseList.addEventListener("click", function(){

 });


 }



 document.addEventListener("DOMContentLoaded", function(){
   eventListeners();
 });
