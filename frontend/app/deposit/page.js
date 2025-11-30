"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DepositPage() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      router.push("/login");
      return;
    }
    setUserId(storedUserId);
  }, []);

  const handleDeposit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount: parseInt(amount) })
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Deposit successful! New balance: ₹${data.balance}`);
        setAmount("");
      } else {
        setMessage(data.error || "Deposit failed");
      }
    } catch (error) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-6">Deposit Money</h1>

          <form onSubmit={handleDeposit}>
            <div className="mb-4">
              <label className="block mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded"
                required
                min="1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Deposit
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-green-600">{message}</p>
          )}

          <Link
            href="/dashboard"
            className="block mt-4 text-center text-blue-500 hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
