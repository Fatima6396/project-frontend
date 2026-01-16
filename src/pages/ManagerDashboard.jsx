import { useEffect, useState } from "react";
import API from "../services/api";

const ManagerDashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const { data } = await API.get("https://project-backend-dusky-two.vercel.app/expenses");
    setExpenses(data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`https://project-backend-dusky-two.vercel.app/expenses/${id}`, { status });
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl text-blue-500 mb-6">Manager</h1>

      <table className="w-full border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Employee</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Purpose</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id} className="text-center border-t border-gray-700">
              <td className="p-2">{exp.employee?.name}</td>
              <td className="p-2">{exp.amount}</td>
              <td className="p-2">{exp.purpose}</td>
              <td className="p-2">{exp.expenseDate.slice(0, 10)}</td>
              <td className="p-2">{exp.status}</td>
              <td className="p-2">
                <button
                  onClick={() => updateStatus(exp._id, "approved")}
                  className="bg-green-600 px-2 py-1 mr-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(exp._id, "rejected")}
                  className="bg-red-600 px-2 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;
