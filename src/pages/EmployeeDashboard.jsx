import { useEffect, useState } from "react";
import API from "../services/api";



const EmployeeDashboard = () => {
   
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const fetchExpenses = async () => {
    const { data } = await API.get("/expenses/my");
    setExpenses(data);
  };

  const submitExpense = async (e) => {
    e.preventDefault();

    await API.post("/expenses", {
      amount,
      purpose,
      expenseDate,
    });

    setAmount("");
    setPurpose("");
    setExpenseDate("");
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl text-blue-500 mb-6">Employee</h1>
      

      {/* Expense Form */}
      <form onSubmit={submitExpense} className="bg-gray-900 p-4 rounded mb-8">
        <h2 className="text-xl mb-4">Submit Expense</h2>

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 mb-3 bg-black border border-blue-600 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Purpose"
          className="w-full p-2 mb-3 bg-black border border-blue-600 rounded"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-2 mb-3 bg-black border border-blue-600 rounded"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />

        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          Submit 
        </button>
     
      </form>

      {/* Expense Table */}
      <table className="w-full border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Amount</th>
            <th className="p-2">Purpose</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id} className="text-center border-t border-gray-700">
              <td className="p-2">{exp.amount}</td>
              <td className="p-2">{exp.purpose}</td>
              <td className="p-2">{exp.expenseDate.slice(0, 10)}</td>
              <td
                className={`p-2 ${
                  exp.status === "approved"
                    ? "text-green-500"
                    : exp.status === "rejected"
                    ? "text-red-500"
                    : "text-yellow-400"
                }`}
              >
                {exp.status}
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
