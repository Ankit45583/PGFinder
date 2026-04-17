import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const OwnerContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    // Yaha future me API call laga sakte ho
    console.log(formData);

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8 grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE - Owner Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Contact Owner
          </h2>

          <div className="space-y-4 text-gray-600">
            <p className="flex items-center gap-3">
              <Phone size={20} /> +91 9876543210
            </p>

            <p className="flex items-center gap-3">
              <Mail size={20} /> owner@example.com
            </p>

            <p className="flex items-center gap-3">
              <MapPin size={20} /> Delhi, India
            </p>
          </div>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Chat on WhatsApp
          </a>

          {/* Social Links */}
          <div className="mt-6 flex gap-4">
            <a href="#" className="text-blue-600 hover:underline">
              Facebook
            </a>
            <a href="#" className="text-pink-500 hover:underline">
              Instagram
            </a>
            <a href="#" className="text-blue-400 hover:underline">
              Twitter
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - Contact Form */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Send Message
          </h3>

          {submitted && (
            <p className="text-green-600 mb-4">
              ✅ Your message has been sent successfully!
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OwnerContact;