import React from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaGraduationCap, FaUserTie, FaHandHoldingHeart } from 'react-icons/fa';
import banner3 from '../Images/banner.jpeg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

function About() {
  return (
    <section className="bg-white sm:pt-14 border-t-4 sm:mt-18">
      {/* Section: About */}
      <div className=" flex flex-col md:flex-row items-center">
        {/* Left Side Image */}
        <motion.div
          className="md:w-1/2 md:mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <img
            src={banner3}
            alt="Sitaram Yadav"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Right Side Content */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-4 md:pl-12 divide-y"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2 className="text-4xl font-bold text-gray-800 sm:mt-18">About Sitaram Yadav</h2>
          <div className="mb-8">
            <FaGavel size="2em" className="text-red-500 mb-2" />
            <h3 className="text-2xl font-semibold mb-2">Background</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sitaram Yadav is a distinguished advocate known for his successful advocacy in civil and criminal cases. His dedication to justice and community welfare has earned him respect and recognition.
            </p>
          </div>
          <div className="mb-8">
            <FaGraduationCap size="2em" className="text-blue-600 mb-2" />
            <h3 className="text-2xl font-semibold mb-2">Education</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Graduated with LLB (Hons) from Dr. Hari Singh Gour University and an LLM from Oriental University, specializing in criminology.
            </p>
          </div>
          <div className="mb-8">
            <FaUserTie size="2em" className="text-green-600 mb-2" />
            <h3 className="text-2xl font-semibold mb-2">Political Role</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Currently serving as district president samajwadi party,damoh,madhya pradesh, Sitaram Yadav plays a pivotal role in shaping youth policies and initiatives.
            </p>
          </div>
          <div>
            <FaHandHoldingHeart size="2em" className="text-pink-500 mb-2" />
            <h3 className="text-2xl font-semibold mb-2">Values</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sitaram Yadav upholds values of integrity, transparency, and social justice in all aspects of his professional and political career.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
