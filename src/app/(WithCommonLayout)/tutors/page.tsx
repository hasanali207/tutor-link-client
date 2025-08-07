import BrowseTutors from "@/components/modules/tutor/BrowseTutors";
import { getAllTutors } from "@/services/tutor";
import React from "react";
import type { Metadata } from 'next'

export const metadata:Metadata = {
  title: "TutorLink | Tutors",
  description: "Find an online tutor to help you study",
};

const TutorsPage = async () => {
  const tutorsData = await getAllTutors(); 
  const tutors = tutorsData?.data || [];
  return (
    <div className="max-w-7xl mx-auto mt-22 pt-16">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Find an online tutor to help you study
      </h2>
      <p className="mt-4 text-sm text-center text-gray-500 max-w-2xl mx-auto">
        Browse our list of experienced and verified tutors across various
        subjects. Whether you are preparing for exams or need help understanding
        difficult topics, find the perfect tutor to guide your learning journey.
      </p>

      <div>
        <BrowseTutors tutors= {tutors}></BrowseTutors> {/* Pass the fetched tutors data to the BrowseTutors component */}
      </div>
    </div>
  );
};

export default TutorsPage;
