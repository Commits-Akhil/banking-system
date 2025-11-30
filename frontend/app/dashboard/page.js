"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      router.push("/login");
      return;
    }
    setUserId(storedUserId);
    fetchBalance(storedUserId);
  }, []);

  const fetchBalance = async (uid) => {
    try {
      const response = await fetch(`http://localhost:5000/balance/${uid}`);
      const data = await response.json();
      if (data.success) {
        setBalance(data.balance);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded shadow-md mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome, {userId}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2">Current Balance</h2>
          <p className="text-3xl font-bold text-green-600">₹{balance}</p>
          <button
            onClick={() => fetchBalance(userId)}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Refresh Balance
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/deposit"
            className="bg-blue-500 text-white p-6 rounded shadow-md hover:bg-blue-600 text-center"
          >
            <h3 className="text-xl font-bold">Deposit</h3>
            <p className="mt-2">Add money to your account</p>
          </Link>

          <Link
            href="/withdraw"
            className="bg-orange-500 text-white p-6 rounded shadow-md hover:bg-orange-600 text-center"
          >
            <h3 className="text-xl font-bold">Withdraw</h3>
            <p className="mt-2">Take money from your account</p>
          </Link>

          <Link
            href="/fd"
            className="bg-green-500 text-white p-6 rounded shadow-md hover:bg-green-600 text-center"
          >
            <h3 className="text-xl font-bold">FD Calculator</h3>
            <p className="mt-2">Calculate fixed deposit returns</p>
          </Link>

          <Link
            href="/loan"
            className="bg-purple-500 text-white p-6 rounded shadow-md hover:bg-purple-600 text-center"
          >
            <h3 className="text-xl font-bold">Loan Calculator</h3>
            <p className="mt-2">Calculate loan EMI</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
