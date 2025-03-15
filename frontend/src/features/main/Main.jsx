import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-100 text-center py-20">
        <h1 className="text-4xl font-bold text-gray-800">🚀 Welcome to DMY SYSTEM</h1>
        <p className="text-gray-600 mt-4">Your ultimate solution for efficient management.</p>
        <Link to="/login" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 inline-block">
          🔑 Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">🔥 Our Features</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">📖 Document Your Daily Life</h3>
              <p className="text-gray-600">Input every hour and get reports for your day.</p>
            </div>

            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">✅ Manage Your Tasks</h3>
              <p className="text-gray-600">Create and track your personalized tasks easily.</p>
            </div>

            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">💰 Track Your Finances</h3>
              <p className="text-gray-600">Gain control over your finances with detailed reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Create Finance Channel */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🏦 Create Your Own Finance Channel</h2>
          <p className="text-gray-600 mb-6">Manage your finances and create your personalized finance channel.</p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">🚀 Start Now</button>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">💬 What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600">"DMY SYSTEM has changed the way I manage my tasks!"</p>
              <h4 className="text-lg font-semibold text-gray-800 mt-4">- John Doe</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600">"An excellent platform for finance tracking!"</p>
              <h4 className="text-lg font-semibold text-gray-800 mt-4">- Sarah Lee</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600">"I love how simple and effective this tool is!"</p>
              <h4 className="text-lg font-semibold text-gray-800 mt-4">- Michael Smith</h4>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">❓ Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">💡 How do I start using DMY SYSTEM?</h3>
              <p className="text-gray-600 mt-2">Simply sign up and log in to explore the features.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">🛠 Can I customize my finance channel?</h3>
              <p className="text-gray-600 mt-2">Yes! You can create a personalized finance tracking system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">📞 Get in Touch</h2>
          <p className="text-gray-600 mb-6">Have questions? Contact us anytime!</p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">📧 Contact Us</button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800">📢 Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mt-2">Stay updated with our latest news and updates.</p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              🔔 Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Main;
