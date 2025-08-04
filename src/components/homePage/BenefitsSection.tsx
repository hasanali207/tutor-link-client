'use client';

import { BookOpenCheck, Clock4, SmilePlus, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BenefitsSection() {
  const benefits = [
    {
      title: 'Flexible Scheduling',
      icon: <Clock4 size={36} className="text-blue-600 dark:text-blue-400" />,
      description: 'Set your availability and connect with students when it suits you best.',
    },
    {
      title: 'Expert Tutors',
      icon: <BookOpenCheck size={36} className="text-blue-600 dark:text-blue-400" />,
      description: 'Learn from qualified tutors with real-world experience and subject expertise.',
    },
    {
      title: 'One-on-One Support',
      icon: <Users size={36} className="text-blue-600 dark:text-blue-400" />,
      description: 'Personalized attention for every student, ensuring better understanding and growth.',
    },
    {
      title: 'Enjoyable Learning',
      icon: <SmilePlus size={36} className="text-blue-600 dark:text-blue-400" />,
      description: 'Engaging sessions that make learning fun and effective for every student.',
    },
  ];

  return (
    <section className="py-16 mt-20 md:mt-0 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-white">
          Why Choose TutorLink?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Empowering students and tutors through powerful features and intuitive design.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center transition hover:shadow-lg dark:hover:shadow-blue-500/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">{benefit.icon}</div>
            <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">
              {benefit.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
