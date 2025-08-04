'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { motion } from 'framer-motion'
import {
  FaChalkboardTeacher,
  FaUsers,
  FaSmile,
  FaHeadset,
  FaRegCalendarCheck,
} from 'react-icons/fa'

const achievements = [
  {
    stat: '5,000+',
    label: 'Successful Sessions',
    icon: <FaRegCalendarCheck size={32} className="text-blue-500 dark:text-blue-400" />,
  },
  {
    stat: '1,200+',
    label: 'Verified Tutors',
    icon: <FaChalkboardTeacher size={32} className="text-green-500 dark:text-green-400" />,
  },
  {
    stat: '10,000+',
    label: 'Registered Students',
    icon: <FaUsers size={32} className="text-purple-500 dark:text-purple-400" />,
  },
  {
    stat: '99%',
    label: 'Positive Feedback',
    icon: <FaSmile size={32} className="text-yellow-500 dark:text-yellow-400" />,
  },
  {
    stat: '24/7',
    label: 'Support Available',
    icon: <FaHeadset size={32} className="text-pink-500 dark:text-pink-400" />,
  },
]

const Slider = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 24,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: { perView: 1, spacing: 12 },
      },
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 16 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 24 },
      },
    },
    created(s) {
      const interval = setInterval(() => {
        s.next()
      }, 3500)
      return () => clearInterval(interval)
    },
  })

  return (
    <section className="py-12 bg-blue-100 dark:bg-gray-900 transition-colors duration-300 border-t border-blue-200 dark:border-gray-700">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl  font-bold text-blue-700 dark:text-white">Our Achievements 🏆</h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Celebrating milestones with our amazing community
        </p>
      </motion.div>

      <div ref={sliderRef} className="keen-slider px-4">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="keen-slider__slide bg-white dark:bg-gray-800 rounded-xl py-8 px-4 text-center shadow-md hover:shadow-lg transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="bg-white dark:bg-gray-700 p-4 rounded-full shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{item.stat}</h3>
              <p className="text-gray-700 dark:text-gray-300">{item.label}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Slider;
