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
            Nếu bạn có thắc mắc hay góp ý, vui lòng điền thông tin bên dưới. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
          </p>

          {status === "success" && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
              Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi sớm.
            </div>
          )}
          {status === "error" && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
              Vui lòng điền đầy đủ thông tin trước khi gửi.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập họ và tên"
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
                placeholder="Nhập email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 font-medium">
                Nội dung
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập nội dung tin nhắn"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Gửi liên hệ
            </button>
          </form>
        </div>
      </Fragment>
    </Layout>
  );
};

export default ContactUs;
