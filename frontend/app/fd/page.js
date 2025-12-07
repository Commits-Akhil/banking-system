"use client";
import {useState} from "react";
import Link from "next/link";

export default function FDPage(){
  const [p,setP]=useState("");
  const [r,setR]=useState("");
  const [t,setT]=useState("");
  const [res,setRes]= useState("");
  const [loading,setLoading]=useState(false);

  const handleCalc=async(e)=>{
    e.preventDefault();
    setRes("");
    setLoading(true);

    try{
      const response=await fetch("http://localhost:5000/fd",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({principal:parseFloat(p),rate:parseFloat(r),time:parseFloat(t)})
      });

      const data=await response.json();

      if(data.success){
        setRes(data.result);
      }else{
        setRes(data.error||"Calculation failed");
      }
    }catch(error){
      setRes("Error connecting to server");
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-6">FD Calculator</h1>

          <form onSubmit={handleCalc}>
            <div className="mb-4">
              <label className="block mb-2">Principal Amount (₹)</label>
              <input type="number" value={p} onChange={(e)=>setP(e.target.value)} className="w-full p-2 border rounded" required step="0.01"/>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Interest Rate (%)</label>
              <input type="number" value={r} onChange={(e)=>setR(e.target.value)} className="w-full p-2 border rounded" required step="0.01"/>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Time Period (years)</label>
              <input type="number" value={t} onChange={(e)=>setT(e.target.value)} className="w-full p-2 border rounded" required step="0.01"/>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400">
              {loading?"Calculating...":"Calculate"}
            </button>
          </form>

          {res&&(
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-lg font-bold text-green-800">{res}</p>
            </div>
          )}

          <Link href="/dashboard" className="block mt-4 text-center text-blue-500 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
