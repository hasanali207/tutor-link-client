"use client";
import { selectCurrentUser } from "@/Redux/Features/Auth/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type BookingType = {
  _id: string;
  tutorId: string;
  tutorName: string;
  subject: string;
  amount: number;
  selectedDate: string;
  transaction: string;
  paidStatus: boolean;
};

const BookingTable = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [bookings, setBookings] = useState<BookingType[]>([]);

  useEffect(() => {
    if (!currentUser?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/payment/my-bookings/${currentUser.email}`);
        const data = await res.json();

        if (data?.data) {
          setBookings(data.data);
        }
      } catch (error) {
        console.error("❌ Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [currentUser?.email]);

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-700 border-b">
            <tr className="bg-blue-100 text-blue-800">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Tutor Name</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b._id} className="border-b">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{b.tutorName}</td>
                <td className="px-4 py-2">{b.subject}</td>
                <td className="px-4 py-2">{new Date(b.selectedDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{b.amount}</td>
                <td className="px-4 py-2">{b.transaction}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded ${b.paidStatus ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                    {b.paidStatus ? "Paid" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
