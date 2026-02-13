import React, { useState } from "react";
import "./lancon.css";

function Subscription() {
  const [email, setEmail] = useState("");
  const handleConnect = () => {
    // Navigate to the Tracking component with the tracking number as a query parameter
    window.location.href = `/Contact?email=${email}`;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rectangle2 relative">
        <p className="rectangle2-text">
          <br></br>WANT TO COLLABORATE WITH US?
        </p>
        <div className="email2">
          <input
            type="email"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="button2" onClick={handleConnect}>
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subscription;