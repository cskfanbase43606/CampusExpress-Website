import React from 'react';
import './Popup.css';
import littleman from "../assets/a-lifelike-pen-and-ink-illustration-of-an-artist-sketching-a-detailed-landscape-artist-located-at-f-119878496 1.png";

const Popup = ({ show, onClose, baseRate, docketCharge, gst, total, finalWeight, odaCharges }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <p className="text-result1">Your Total Cost</p>
        <p className="total-cost">Final Weight &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {finalWeight} Kgs</p>
        <p className="total-cost">Base Rate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {baseRate}</p>
        <p className="total-cost">Docket Charge&nbsp;&nbsp;: {docketCharge}</p>
        <p className="total-cost">ODA Charges&nbsp;&nbsp;&nbsp;&nbsp;: {odaCharges}</p>
        <p className="total-cost">GST (18%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {gst}</p>
        <p className="total-cost">Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {total}</p>
        <img src={littleman} className="popup-image" alt="Little Man" />
      </div>
    </div>
  );
};

export default Popup;