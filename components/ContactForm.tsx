import React from "react";

const ContactForm: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <h1 className="text-4xl text-slate-300 font-bold mb-4 text-center">
          Contact Me
        </h1>
        <div
          className="contact-form bg-gray-800 p-4 rounded"
          dangerouslySetInnerHTML={{
            __html: '[contact-form-7 id="84ead77" title="Email Form"]',
          }}
        />
      </div>
    </div>
  );
};

export default ContactForm;
