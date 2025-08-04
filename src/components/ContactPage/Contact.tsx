'use client';

import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section id="contact" className="w-full min-h-screen py-16 px-6 bg-white dark:bg-gray-900 text-blue-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          🤝 Get in Touch
        </motion.h2>
        <p className="text-center mb-12 text-gray-600 dark:text-gray-300">
          Have a question, feedback, or want to partner with us? Reach out using the form below or chat live!
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow">
            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input type="text" className="w-full p-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" className="w-full p-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Message</label>
              <textarea className="w-full p-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" rows={4} required></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Send Message
            </button>
          </form>

          {/* Live Chat or Contact Info */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-4">💬 Live Chat</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You can also start a live chat with our support team. We are available 24/7 to assist you.
            </p>
            <div className="text-gray-700 dark:text-gray-200">
              <p>Email: <a href="mailto:support@tutorlink.com" className="underline">support@tutorlink.com</a></p>
              <p className="mt-2">Phone: +1 (234) 567-890</p>
              {/* Live chat script goes here */}
              {/* Example: <div id="tawk-widget" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
