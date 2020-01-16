import React from "react";
import "./SMSSender.css";

const SMSSender = props => {
  return (
    <div className="sms-wrapper">
      <form action="">
        <input name="number" type="text" />
        <button>Send SMS</button>
      </form>
    </div>
  );
};

export default SMSSender;
