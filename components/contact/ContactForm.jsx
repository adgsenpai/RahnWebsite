import { useState } from "react";
import axios from "axios";
import Modal from "../common/Modal";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiKey = "RahnWebsite"; // must match backend

    try {
      setModal({
        isOpen: true,
        type: "loading",
        title: "Sending Message...",
        message: "Please wait while we send your message.",
      });

      const response = await axios.post(
        "/api/sendContactForm",
        {
          email: formData.email,
          subject: formData.subject || `Message from ${formData.name}`, // fallback
          message: `${formData.name} wrote:\n\n${formData.message}`,
          phone: formData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setModal({
          isOpen: true,
          type: "success",
          title: "Message Sent!",
          message: "Your message has been sent successfully. We'll get back to you soon!",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);
      setModal({
        isOpen: true,
        type: "error",
        title: "Oops...",
        message: "Failed to send your message. Please try again later.",
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
      <div className="form-style-two" data-aos="fade-up">
      <form onSubmit={handleSubmit}>
        <div className="row controls">
          {/* Subject Dropdown */}
          <div className="col-12">
            <div className="input-group-meta form-group mb-30">
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="">Select a Subject*</option>
                <option value="Rahn IT recruitment">Rahn IT Recruitment</option>
                <option value="Rahn Consulting">Rahn Consulting</option>
                <option value="Rahn Process Optimisation">
                  Rahn Process Optimisation
                </option>
                <option value="Rahn Custom Software">
                  Rahn Custom Software
                </option>
                <option value="Rahn Monitor">Rahn Monitor</option>
              </select>
            </div>
          </div>
          {/* Name */}
          <div className="col-12">
            <div className="input-group-meta form-group mb-30">
              <input
                type="text"
                name="name"
                placeholder="Your Name*"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="col-12">
            <div className="input-group-meta form-group mb-30">
              <input
                type="email"
                name="email"
                placeholder="Email Address*"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="col-12">
            <div className="input-group-meta form-group mb-30">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="col-12">
            <div className="input-group-meta form-group mb-30">
              <textarea
                name="message"
                placeholder="Your message*"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="col-12">
            <button
              type="submit"
              className="btn-twentyOne fw-500 tran3s d-block"
            >
              Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default ContactForm;
