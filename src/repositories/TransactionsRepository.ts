import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface GetTransactions {
  transactions: Array<Transaction>;
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): GetTransactions {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(transaction => {
      return transaction.type === 'income';
    });

    const totalIncomeTransactions = incomeTransactions.reduce(
      (prevVal, elem) => prevVal + elem.value,
      0,
    );

    const outcomeTransactions = this.transactions.filter(transaction => {
      return transaction.type === 'outcome';
    });

    const totaloutcomeTransactions = outcomeTransactions.reduce(
      (prevVal, elem) => prevVal + elem.value,
      0,
    );

    return {
      income: totalIncomeTransactions,
      outcome: totaloutcomeTransactions,
      total: totalIncomeTransactions - totaloutcomeTransactions,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
