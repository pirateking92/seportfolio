import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`Failed to send message: ${data.error}`);
      }
    } catch (error) {
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <h1 className="text-4xl text-slate-300 font-bold mb-4 text-center">
          Contact Me
        </h1>
        <form
          onSubmit={handleSubmit}
          className="contact-form bg-gray-800 p-4 rounded"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-slate-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-slate-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              rows={4}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
          {status && (
            <p className="mt-4 text-center text-slate-300">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
