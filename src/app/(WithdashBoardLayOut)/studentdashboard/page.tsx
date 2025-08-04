// app/dashboard/page.tsx
"use client";

import MyRequestsTable from "../../../components/dashboard/student/MyRequestsTable";

export default function DashboardPage() {
  return (
    <div className="flex  bg-gray-100 dark:bg-gray-900 ">
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">My Requests</h2>
        <MyRequestsTable />
      </main>
    </div>
  );
}
