"use client";

import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/Redux/Features/Auth/authSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MyRequestsTable() {
  const [requests, setRequests] = useState(null);
  const currentUser = useSelector(selectCurrentUser);

  console.log(currentUser)
  
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/api/permits/get/${currentUser?.email}`,
          {
            next: { revalidate: 30 },
          }
        );

        const data = await res.json();

        setRequests(data?.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchRequest();
  }, [currentUser?.email]);

const handlePayment = async (request: any) => {
  const paymentData = {
    requestId: request._id,
    selectedDate: new Date(), // বা যেই দিন তুমি চাইবে সেট করো
    amount: request.tutorId.price || 0,  // salary বা price যেটা আছে
    tutorId: request.tutorId._id,
    tutorName: request.tutorId.name,
    userEmail: request.userEmail,
    subject: request.tutorId.subject || 'math',
    // string or number, তোমার ব্যাকএন্ড মোডেল 
    transaction: `txn_${Date.now()}`,
  };

  console.log("Sending Payment Data:", paymentData); // ✅ debug করার জন্য

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();
    console.log("Payment Response:", data);

    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;
    } else {
      console.error("Failed to initiate payment", data);
    }
  } catch (error) {
    console.error("Payment Error", error);
  }
};

  return (
    <div className="bg-white dark:bg-gray-600 shadow rounded-lg overflow-x-auto w-full">
      <table className="w-full text-sm">
        <thead className="bg-blue-100 text-blue-800">
          <tr className="text-left">
            <th className="p-3">#</th>
            <th className="p-3">Profile</th>
            <th className="p-3">Tutor Name</th>
            <th className="p-3">Availability</th>
            <th className="p-3">Accepted</th>
            <th className="p-3">Payment</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((d, i) => (
            <tr key={i} className="border-t">
              <td className="p-3">{i + 1}</td>
              <td className="p-3">
                <Image
                  width={400}
                  height={400}
                  src="https://github.com/shadcn.png"
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
              </td>
              <td className="p-3">{d.tutorId?.name}</td>
              <td className="p-3">
                {new Date(d.tutorId?.availability?.from).toISOString().split("T")[0]} -
                {new Date(d.tutorId?.availability?.to).toISOString().split("T")[0]}
              </td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    d.isAccept === true ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                >
                  {d.isAccept ? <button>Yes</button> : <button>No</button>}
                </span>
              </td>
              <td className="p-3">
                <span className="px-2 py-1 rounded text-xs">
                  {d.isPayment === false ? <p>Pending</p> : <p>Paid</p>}
                </span>
              </td>
              <td className="p-3">
                {d.isPayment ? (
                  <Button
                    disabled
                    className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-green-700 text-base"
                  >
                    Paid
                  </Button>
                ) : (
                  <Button
                    disabled={!d.isAccept}
                    onClick={() => handlePayment(d)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-blue-100 disabled:text-blue-500 text-base"
                  >
                    Pay Now
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
