"use client";
import {useState,useEffect} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function WithdrawPage(){
  const [userId,setUserId]=useState("");
  const [amt,setAmt]=useState("");
  const [msg,setMsg]= useState("");
  const router=useRouter();

  useEffect(()=>{
    const uid = localStorage.getItem("userId");
    if(!uid){
      router.push("/login");
      return;
    }
    setUserId(uid);
  },[]);

  const handleWithdraw=async(e)=>{
    e.preventDefault();
    setMsg("");

    try{
      const res=await fetch("http://localhost:5000/withdraw",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({userId,amount:parseInt(amt)})
      });

      const data=await res.json();

      if(data.success){
        setMsg(`Withdrawal successful! New balance: ₹${data.balance}`);
        setAmt("");
      }else{
        setMsg(data.error||"Withdrawal failed");
      }
    }catch(error){
      setMsg("Error connecting to server");
    }
  };

  return(
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-6">Withdraw Money</h1>

          <form onSubmit={handleWithdraw}>
            <div className="mb-4">
              <label className="block mb-2">Amount</label>
              <input type="number" value={amt} onChange={(e)=>setAmt(e.target.value)} className="w-full p-2 border rounded" required min="1"/>
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
              Withdraw
            </button>
          </form>

          {msg&&(
            <p className="mt-4 text-center text-sm">{msg}</p>
          )}

          <Link href="/dashboard" className="block mt-4 text-center text-blue-500 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
