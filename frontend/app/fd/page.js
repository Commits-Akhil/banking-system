"use client";
import { useState } from "react";
import Link from "next/link";

export default function FDPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setResult("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/fd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          principal: parseFloat(principal),
          rate: parseFloat(rate),
          time: parseFloat(time)
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setResult(data.error || "Calculation failed");
      }
    } catch (error) {
      setResult("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-6">FD Calculator</h1>

          <form onSubmit={handleCalculate}>
            <div className="mb-4">
              <label className="block mb-2">Principal Amount (₹)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full p-2 border rounded"
                required
                step="0.01"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Interest Rate (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full p-2 border rounded"
                required
                step="0.01"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Time Period (years)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border rounded"
                required
                step="0.01"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-lg font-bold text-green-800">{result}</p>
            </div>
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
