import React from 'react';
import { FaBalanceScale, FaBullhorn, FaUsers } from 'react-icons/fa';

function Services() {
  return (
    <section id="services" className="py-12 bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-blue-600">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaBalanceScale size="3em" className="text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold text-center mb-2">Legal Services</h3>
            <p className="text-center mb-4">Sitaram Yadav offers comprehensive legal services to hospitals, clinics, and doctors, including civil and criminal case representation:</p>
            <ul className="list-disc list-inside text-left">
              <li>Legal consultation</li>
              <li>Case representation</li>
              <li>Civil cases</li>
              <li>Criminal cases</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaBullhorn size="3em" className="text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold text-center mb-2">Political Services</h3>
            <p className="text-center mb-4">As the state secretary of the Samajwadi Party Yuvjan Sabha, Sitaram Yadav provides vital political services, including:</p>
            <ul className="list-disc list-inside text-left">
              <li>Political advocacy</li>
              <li>Managing political campaigns</li>
              <li>Community engagement initiatives</li>
              <li>Policy development and implementation</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaUsers size="3em" className="text-red-600 mb-4" />
            <h3 className="text-2xl font-semibold text-center mb-2">Leadership</h3>
            <p className="text-center mb-4">Sitaram Yadav's leadership within the Samajwadi Party Yuvjan Sabha includes:</p>
            <ul className="list-disc list-inside text-left">
              <li>Guiding youth initiatives and programs</li>
              <li>Representing youth interests at the state level</li>
              <li>Mentoring young political aspirants</li>
              <li>Driving social and political change</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
