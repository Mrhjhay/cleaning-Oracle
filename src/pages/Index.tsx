
import { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  MinusCircle, 
  DollarSign,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
}

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [newAmount, setNewAmount] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const formatCurrency = (amount: number) => {
    return `GH₵${amount.toFixed(2)}`;
  };

  const handleAddTransaction = () => {
    if (!newAmount || !newDescription) {
      alert('Please fill in all fields');
      return;
    }

    const amount = parseFloat(newAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      type: transactionType,
      amount: amount,
      description: newDescription,
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions([...transactions, newTransaction]);
    setNewAmount('');
    setNewDescription('');
  };

  const chartData = [
    { name: 'Income', amount: totalIncome },
    { name: 'Expenses', amount: totalExpenses },
    { name: 'Balance', amount: balance }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Finance Monitor (Ghana Cedis)</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Total Income</h2>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(totalIncome)}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-600 mt-2">{formatCurrency(totalExpenses)}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Current Balance</h2>
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <p className={`text-2xl font-bold mt-2 ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Amount']} />
                <Bar dataKey="amount" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Add Transaction Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Transaction</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="flex gap-2">
                <Button
                  variant={transactionType === 'income' ? 'default' : 'outline'}
                  onClick={() => setTransactionType('income')}
                  className="flex-1"
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Income
                </Button>
                <Button
                  variant={transactionType === 'expense' ? 'default' : 'outline'}
                  onClick={() => setTransactionType('expense')}
                  className="flex-1"
                >
                  <MinusCircle className="w-4 h-4 mr-1" />
                  Expense
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (GH₵)</label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddTransaction} className="w-full">
                Add Transaction
              </Button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 p-6 border-b">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium
                      ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
