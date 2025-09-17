import Swal from "sweetalert2";
import { useState } from "react";

const NewsLetter = () => {
  const [getEmail, setEmail] = useState(""); 
  const subscribeNewsLetter = async (e) => {
    e.preventDefault();    

    try {
      const response = await fetch("/api/subscribeToNewsLetter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: getEmail }),
      });

      const data = await response.json();

      if (data) {
        Swal.fire({
          icon: "success",
          title: "Subscription",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Subscription",
        text: error.message,
      });
    }


  };

  return (
    <form className="position-relative" onSubmit={subscribeNewsLetter}>
      <input
        type="email"
        placeholder="Enter your email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="tran3s fw-500 position-absolute">
        Subscribe
      </button>
    </form>
  );
};

export default NewsLetter;
