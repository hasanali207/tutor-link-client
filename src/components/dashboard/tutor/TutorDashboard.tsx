"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Calendar, BookOpen, Users } from "lucide-react";

export default function TutorDashboard() {
  const infoCards = [
    { label: "Total Bookings", value: 8, icon: <BookOpen /> },
    { label: "Total Spent", value: "$2900", icon: <span>💳</span> },
    { label: "Upcoming Sessions", value: 0, icon: <Calendar /> },
    { label: "Completed Sessions", value: 0, icon: <span>✅</span> },
  ];

  const activityStats = [
    { label: "Enrolled Subjects", value: 0, icon: <BookOpen /> },
    { label: "Hired Tutors", value: 0, icon: <Users /> },
    { label: "Reviews Written", value: 4, icon: <Star /> },
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

      <section className="bg-white rounded-xl shadow p-6 border border-indigo-100">
        <h2 className="text-lg font-semibold text-indigo-700 mb-4">
          📚 Learning Progress
        </h2>
        <div className="space-y-4">
          <ProgressBar label="Bookings Completion (0/8)" />
          <ProgressBar label="Upcoming Sessions (0/8)" />
          <div className="bg-indigo-50 p-4 rounded text-indigo-700 text-sm">
            <strong>Learning Tip:</strong> Regular study sessions of 25–30
            minutes with short breaks in between can improve retention by up to
            30%.
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow p-6 border border-indigo-100">
        <h2 className="text-lg font-semibold text-indigo-700 mb-4">
          🔺 Learning Activity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {activityStats.map((stat, i) => (
            <Card key={i} className="bg-indigo-50">
              <CardContent className="flex flex-col items-center py-6">
                <div className="text-indigo-600 text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-indigo-800">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-gray-600 text-sm">
          <strong>Activity Summary:</strong> You’ve been making steady progress!
          Your engagement is active. Consider hiring a tutor to accelerate your
          learning.
        </p>
      </section>
    </div>
  );
}

function ProgressBar({ label }: { label: string }) {
  return (
    <div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className="h-2 bg-indigo-400 w-[0%] rounded"></div>
      </div>
    </div>
  );
}
