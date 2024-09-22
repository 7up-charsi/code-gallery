// generated with gemini

export const getMonthlyPayment = (
  amount: number,
  interestRate: number,
  term: number,
) => {
  // Convert interest rate to monthly decimal
  const monthlyInterestRate = interestRate / 1200;

  // Convert term from years to total payments
  const totalPayments = term * 12;

  // Repayment mortgage formula
  const numerator =
    monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, totalPayments);
  const denominator =
    Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
  return amount * (numerator / denominator);
};

export const getTotalPayment = (
  monthlyPayment: number,
  term: number,
) => {
  // Total payment is monthly payment times total number of payments
  return monthlyPayment * term * 12;
};

export const getInterestOnlyPayment = (
  totalPayment: number,
  amount: number,
) => {
  // Interest payment is total payment minus amount
  return totalPayment - amount;
};
