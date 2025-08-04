'use client';

import Image from 'next/image';

const teamMembers = [
  {
    name: 'Aria Johnson',
    role: 'Lead Developer',
    image: 'https://i.ibb.co.com/sxr43gZ/cute-woman-avatar-profile-vector-illustration-1058532-14546.jpg',
  },
  {
    name: 'Liam Chen',
    role: 'Education Specialist',
    image: 'https://i.ibb.co.com/TBTwPyCX/flat-design-happy-middle-age-man-icon-vector-illustration-1322553-70859.jpg',
  },
  {
    name: 'Rachin Rivera',
    role: 'Product Designer',
    image: 'https://i.ibb.co.com/S7GPdmtF/young-black-man-icon-vector-man-icon-illustration-face-black-man-icon-african-people-icons-cartoon-s.webp',
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 text-center" id="team">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-800 dark:text-white mb-4">Meet the Team</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-12">
          TutorLink is built by a team of educators, developers, and lifelong learners who are passionate about transforming the way people connect for education. Our team combines technical excellence with a deep understanding of the challenges students and tutors face in the modern learning environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-all">
              <div className="w-28 h-28 mx-auto relative mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-700 dark:text-white">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
