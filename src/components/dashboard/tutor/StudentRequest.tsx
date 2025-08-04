"use client";
import { selectCurrentUser } from "@/Redux/Features/Auth/authSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Request = {
  _id: string;
  tutorId: string;
  userEmail: string;
  price: number;
  isAccept: boolean;
};

const statusStyles = {
  Accepted: "bg-green-500",
  Pending: "bg-yellow-500",
};

export default function StudentRequest() {
  const [requests, setRequests] = useState<Request[]>([]);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!currentUser?._id) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/api/permits/get-requests/${currentUser._id}`
        );
        const data = await res.json();
        setRequests(data.data || []);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    fetchRequests();
  }, [currentUser?._id]);

  const getStatus = (isAccept: boolean) => (isAccept ? "Accepted" : "Pending");

  // Handler to toggle status by clicking
  const toggleStatus = async (requestId: string, currentStatus: boolean) => {
    try {
      // Optimistically update UI
      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, isAccept: !currentStatus } : req
        )
      );

      // Call backend API to update status
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/api/permits/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAccept: !currentStatus }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update request status");
      }
    } catch (error) {
      console.error(error);
      // Rollback UI update on error
      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, isAccept: currentStatus } : req
        )
      );
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 overflow-y-auto max-h-[500px]">
      <h2 className="text-center text-xl font-bold mb-6">Request Form</h2>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="text-center text-gray-500">No requests found.</div>
        ) : (
          requests.map((req) => (
            <div
              key={req._id}
              className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div>
                <div className="font-bold text-lg text-gray-900">
                  {req.userEmail}
                </div>
                <div className="text-gray-600 text-sm">Price: ${req.price}</div>
              </div>
              <button
                onClick={() => toggleStatus(req._id, req.isAccept)}
                className={`text-white text-sm font-semibold px-4 py-2 rounded-full cursor-pointer ${
                  statusStyles[getStatus(req.isAccept)]
                }`}
                aria-label={`Set status to ${
                  req.isAccept ? "Pending" : "Accepted"
                }`}
              >
                {getStatus(req.isAccept)}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
