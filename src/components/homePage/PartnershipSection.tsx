'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { name: 'Khan Academy', logo: 'https://i.ibb.co.com/Q7YKs7rr/images.jpg' },
  { name: 'Coursera', logo: 'https://i.ibb.co.com/kPV0r9R/coursera-on-campus-launched-to-enhance-reach-of-its-online-courses.webp' },
  { name: 'EdX', logo: 'https://i.ibb.co.com/LXtGHyjH/channels4-profile.jpg' },
  { name: 'Udemy', logo: 'https://i.ibb.co.com/sTxdpTq/gametiles-com-udemy-android.jpg' },
  { name: 'UNESCO', logo: 'https://i.ibb.co.com/HLjD0kRD/Design-sans-titre-1.png' },
];

const Partnerships = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-blue-700  dark:text-white mb-6"
        >
          🤝 Our Trusted Partners
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          We’re proud to collaborate with leading organizations in education and technology to ensure
          every student and tutor gets the best tools and support.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative w-28 h-14 mx-auto"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
