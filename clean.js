'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

//If we want to make a data structure immutable, we simply use
//Object.freeze({...code here...})
//However, we can mutate the inner properties

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits, user) => limits?.[user] ?? 0;

//This function: is an inpure function because it tried to manipulate
//outside data.

//pure function:
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();
  const returnValue =
    value <= getLimit(limits, cleanUser)
      ? [...state, { value: -value, description, user: cleanUser }]
      : state;

  return returnValue;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');

//Effecting this budget:
//For the changes to reflect, we have to update the budget parameter:

const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

const checkExpenses = function (state, limits) {
  return state.map(entry => {
    return entry.value < -getLimit(entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });

  // for (const entry of budget)
  //   if (entry.value < -getLimit(entry.user)) flag = 'limit';
};

const finalBudget = checkExpenses(newBudget3, spendingLimits);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join('/');
  console.log(bigExpenses);

  // let output = '';
  // for (const el of budget)
  //   output += el.value <= -bigLimit ? `${el.description.slice(-2)} /` : '';
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

// console.log(newBudget1);

// console.log(newBudget2);

console.log(finalBudget);

logBigExpenses(finalBudget, 1000);
