"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calendar, Users, Star } from "lucide-react";
import { useAppSelector } from "@/Redux/hook";
import { selectCurrentUser } from "@/Redux/Features/Auth/authSlice";

interface BookingType {
  amount: number;
  tutorName: string;
  userEmail: string;
  subject: string;
  selectedDate: string;
  paidStatus: boolean;
  transaction: string;
}

export default function TutorDashboard() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  
  const currentUser = useAppSelector(selectCurrentUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/api/payment/bookings/${currentUser?._id}`
        );
        const data = await res.json();
        if (data.status) {
          setBookings(data.data || []);
        }
      } catch (error) {
        console.error("❌ Failed to fetch tutor bookings:", error);
      }
    };

    fetchData();
  }, []);

  



  // 🔢 Calculate total amount
  const totalAmount = bookings.reduce((sum, b) => sum + b.amount, 0);

  const infoCards = [
    { label: "Total Bookings", value: bookings.length, icon: <BookOpen /> },
    { label: "Total Earned", value: `$${totalAmount}`, icon: <span>💳</span> },
    { label: "Upcoming Sessions", value: 0, icon: <Calendar /> },
    { label: "Completed Sessions", value: bookings.length, icon: <span>✅</span> },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-white overflow-y-auto max-h-[500px] space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {infoCards.map((card, index) => (
          <Card key={index} className="shadow-md bg-white border-blue-100">
            <CardContent className="p-4 space-y-2">
              <div className="text-gray-500 text-sm">{card.label}</div>
              <div className="text-2xl font-semibold text-blue-600 flex items-center gap-2">
                {card.icon} {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-white rounded-xl shadow p-6 border border-indigo-100 mt-4">
        <h2 className="text-lg font-semibold text-indigo-700 mb-4">
          🧾 All Bookings
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{b.userEmail}</td>
                  <td className="px-4 py-2">{b.subject}</td>
                  <td className="px-4 py-2">
                    {new Date(b.selectedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">${b.amount}</td>
                  <td className="px-4 py-2">
                    {b.paidStatus ? "✅ Paid" : "❌ Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
