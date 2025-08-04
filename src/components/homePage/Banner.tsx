"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';


const Banner = () => {
  return (
    <section className="w-full items-center bg-blue-50 dark:bg-gray-900 text-slate-900 dark:text-white py-12 px-6 mt-[80px]">
  <div className="max-w-7xl mx-auto h-full flex flex-col-reverse md:flex-row items-center justify-center gap-10">

    {/* Text Section */}
    <div className="space-y-6 text-center md:text-left">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-700 dark:text-white leading-tight">
        Find & Connect with the Best Tutors
      </h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg">
        TutorLink helps students succeed by matching them with top-rated, verified tutors across all subjects.
      </p>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto md:mx-0">
        <input
          type="text"
          placeholder="Search by subject, grade, or tutor..."
          className="w-full py-3 pl-12 pr-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none"
        />
        <Search className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400" size={20} />
      </div>

      {/* CTA Buttons */}
      <div className="flex justify-center md:justify-start gap-4 pt-2">
        <Link href="/tutors">
          <Button>Find Tutors</Button>
        </Link>
      </div>
    </div>

    {/* Image Section */}
    <div className="relative w-full h-[550px] md:h-[550px] hover:shadow-blue-600 hover:scale-105 transition-transform duration-300 ease-in-out rounded-xl overflow-hidden">
      <Image
        src="https://i.ibb.co/DxC7QQx/banner1.png"
        alt="Banner"
        fill
        className="object-cover rounded-xl shadow-xl"
        priority
      />
    </div>
  </div>
</section>

  );
};

export default Banner;
