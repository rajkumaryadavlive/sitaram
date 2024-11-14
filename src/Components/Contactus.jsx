import React from 'react';

function ContactUs() {
  return (
    <section id="contact" className="p-8 bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Get in Touch</h2>
        <form className="flex flex-col space-y-4 hidden">
          <input type="text" placeholder="Name" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600" />
          <input type="email" placeholder="Email" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600" />
          <textarea placeholder="Message" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"></textarea>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Send Message</button>
        </form>
        <div className="text-center mt-6">
          <p className="mb-2">Connect with me on</p>
          <div className="flex justify-center space-x-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter</a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>Phone: <a href="tel:+919098650975" className="text-blue-600 hover:underline">+91 9098650975</a></p>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
