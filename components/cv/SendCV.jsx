import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "../../captcha/ServerActions"; // Adjust the path
import axios from "axios";
import Swal from "sweetalert2";

const CVForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobtitle:"",
    message: "",
    cv: null, // Initialize cv to null
  });

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === "cv") {
      setFormData({
        ...formData,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCaptchaSubmission = async (token) => {
    try {
      await verifyCaptcha(token);
      setIsCaptchaVerified(true);
    } catch (error) {
      console.error("Error verifying captcha:", error);
      setIsCaptchaVerified(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isCaptchaVerified) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please verify that you are not a robot!",
      });

      return;
    }

    const { name, email,jobtitle, message, cv } = formData;

    //make cv base64

    const reader = new FileReader();
    reader.readAsDataURL(cv);
    const base64cv = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    // split
    const base64cvSplit = base64cv.split(",");
    const base64cvType = base64cvSplit[0];
    const base64cvData = base64cvSplit[1];

    const htmlcode = `
      <h3>CV from ${name}</h3>
      <p>${message}</p>
    `;
    const data = {
      name: name,
      email: email,
      filename: cv.name,      
      message: htmlcode,
      subject: "CV - "+name+" - "+jobtitle,
      htmlcode: htmlcode,
      cv: base64cvData,
    };

    const apiKey = "RahnWebsite";

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      Swal.fire({
        title: "Sending Email...",
        text: "Please wait",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post("/api/sendCV", data, config);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Email sent successfully!",
        });

        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while sending the email.",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while sending the email.",
      });
    }
  };
  return (
    <div className="container" data-aos="fade-up">
      <form onSubmit={handleSubmit}>
        <div className="messages" />
        <div className="row controls">
          <div className="col-lg-12">
            <div className="input-group-meta form-group mb-30">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name*"
                name="name"
                required
                data-error="Name is required."
                onChange={handleChange}
              />
              <div className="help-block with-errors" />
            </div>
          </div>

          <div className="col-12">
            <div className="input-group-meta form-group mb-20">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address*"
                name="email"
                required
                data-error="Valid email is required."
                onChange={handleChange}
              />
              <div className="help-block with-errors" />
            </div>
          </div>

          <div className="col-12">
            <div className="input-group-meta form-group mb-20">
              <input
                type="text"
                className="form-control"
                placeholder="Job Title"
                name="jobtitle"
                required
                data-error="Job Title is required"
                onChange={handleChange}
              />
              <div className="help-block with-errors" />
            </div>
          </div>

          <div className="col-12">
            <div className="input-group-meta form-group mb-30">
              <textarea
                className="form-control"
                placeholder="Your message*"
                name="message"
                required
                data-error="Please, leave us a message."
                defaultValue={""}
                onChange={handleChange}
              />
              <div className="help-block with-errors" />
            </div>
          </div>

          {/* CV Upload */}
          <div className="col-12">
            <div className="input-group-meta form-group mb-30">
              <input
                type="file"
                className="form-control"
                placeholder="Upload CV*"
                name="cv"
                required
                // only pdf
                accept="application/pdf"
                data-error="Please, upload your CV."
                onChange={handleChange}
              />
              <div className="help-block with-errors" />
            </div>
          </div>

          <div className="col-12">
            <ReCAPTCHA
              sitekey="6LcWg9knAAAAADzPo6gsqy5SW9vTYlRuYe3ZlKS1"
              onChange={handleCaptchaSubmission}
            />
            <br />
            <button
              className="btn-twentyOne fw-500 tran3s d-block"
              disabled={!isCaptchaVerified}
            >
              Submit CV
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CVForm;
