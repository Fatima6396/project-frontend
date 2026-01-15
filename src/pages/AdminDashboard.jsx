import { useEffect, useState } from "react";
import API from "../services/api";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [report, setReport] = useState({});

  const fetchData = async () => {
    const usersRes = await API.get("/admin/users");
    const expensesRes = await API.get("/admin/expenses");
    const reportRes = await API.get("/admin/report");

    setUsers(usersRes.data);
    setExpenses(expensesRes.data);
    setReport(reportRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl text-blue-500 mb-6">Admin </h1>

      {/* REPORT */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {["total", "approved", "rejected", "pending"].map((key) => (
          <div key={key} className="bg-gray-900 p-4 rounded text-center">
            <p className="text-gray-400 capitalize">{key}</p>
            <p className="text-2xl text-blue-500">{report[key]}</p>
          </div>
        ))}
      </div>

      {/* USERS TABLE */}
      <h2 className="text-xl mb-3">Users</h2>
      <table className="w-full mb-8 border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="text-center border-t border-gray-700">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2 text-blue-400">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EXPENSE TABLE */}
      <h2 className="text-xl mb-3">All Expenses</h2>
      <table className="w-full border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Employee</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Purpose</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e._id} className="text-center border-t border-gray-700">
              <td className="p-2">{e.employee?.name}</td>
              <td className="p-2">{e.amount}</td>
              <td className="p-2">{e.purpose}</td>
              <td
                className={`p-2 ${
                  e.status === "approved"
                    ? "text-green-500"
                    : e.status === "rejected"
                    ? "text-red-500"
                    : "text-yellow-400"
                }`}
              >
                {e.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
