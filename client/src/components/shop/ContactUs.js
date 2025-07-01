import React, { useState, useEffect, Fragment } from "react";
import Layout from "./layout";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us - Hayroo Store";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // null | "success" | "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả sử gửi form thành công ngay (bạn có thể thêm fetch API gửi server ở đây)
    if (formData.name && formData.email && formData.message) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <Fragment>
        <div className="max-w-3xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Contact Us
          </h1>
          <p className="mb-8 text-gray-700 text-center">
            If you have any questions or feedback, please fill out the form below. We will get back to you as soon as possible.
          </p>

          {status === "success" && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
              Thank you for contacting us! We will respond soon.
            </div>
          )}
          {status === "error" && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
              Please fill in all fields before submitting.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 font-medium">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </Fragment>
    </Layout>
  );
};

export default ContactUs;
