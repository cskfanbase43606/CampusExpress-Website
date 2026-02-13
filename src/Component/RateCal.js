import React, { useState } from "react";
import "./RateCalc.css";
import pincodeData from "./pincodeData";
import image3 from "../assets/upper_chunk.png";
import Popup from "./Popup";
const INVALID_PINCODE = "Invalid Pincode";



const RateCalculator = () => {
  const [originPincode, setOriginPincode] = useState("");
  const [destinationPincode, setDestinationPincode] = useState("");
  const [weight, setWeight] = useState("");
  const [baseRate, setBaseRate] = useState("");
  const [docketCharge, setDocketCharge] = useState("");
  const [gst, setGST] = useState("");
  const [total, setTotal] = useState("");
  const [finalWeight, setFinalWeight] = useState("");
  const [odaCharges, setODACharges] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [rows, setRows] = useState([{ quantity: "", height: "", length: "", width: "" }]);

  const zoneChargesMatrix = [
    [26, 28, 29, 40, 30, 30, 32, 34, 30],
    [28, 26, 29, 40, 30, 30, 32, 32, 30],
    [29, 29, 26, 40, 30, 30, 32, 32, 30],
    [32, 32, 29, 26, 32, 32, 32, 32, 32],
    [30, 30, 32, 40, 26, 28, 30, 32, 30],
    [30, 30, 32, 40, 28, 26, 30, 32, 30],
    [30, 30, 32, 40, 29, 28, 26, 28, 29],
    [32, 32, 32, 40, 32, 30, 28, 26, 30],
    [30, 30, 32, 40, 28, 29, 30, 32, 26],
  ];

  const getZoneByPincode = (pincode) => {
    const pincodeDetails = pincodeData.find(
      (item) => item.pincode === parseInt(pincode)
    );
    return pincodeDetails ? zoneToIndex(pincodeDetails.Zone) : INVALID_PINCODE;
  };

  const zoneToIndex = (zone) => {
    const zoneMap = {
      N1:0,
      N2:1,
      E1:2,
      NE:3,
      W1:4,
      W2:5,
      S1:6,
      S2:7,
      C1:8,
    };

    return zoneMap[zone];
  };

  const handleCalculate = () => {
    if (
      !originPincode ||
      !destinationPincode ||
      !weight ||
      rows.some(row => !row.quantity || !row.height || !row.length || !row.width)
    ) {
      setPincodeError("Please fill in all required fields.");
      return;
    }
  
    const originZone = getZoneByPincode(originPincode);
    const destinationZone = getZoneByPincode(destinationPincode);
    if (originZone === INVALID_PINCODE || destinationZone === INVALID_PINCODE) {
      setPincodeError("Invalid Pincode");
      return;
    }
  
    setPincodeError("");
  
    const zoneCharge = zoneChargesMatrix[originZone][destinationZone];
    const weightInput = parseFloat(weight);
  
    // Calculate the volumetric weight for all rows
    const totalVolumetricWeight = rows.reduce((total, row) => {
      const volumetricWeight =
        (parseFloat(row.length) *
          parseFloat(row.height) *
          parseFloat(row.width) *
          parseFloat(row.quantity)) /
        4000;
      return total + volumetricWeight;
    }, 0);
  
    // Compare volumetric weight with weight input and use the higher value
    const finalWeight = Math.max(weightInput, totalVolumetricWeight, 20);
  
    // Calculate base rate
    const finalRate = finalWeight * zoneCharge;
  
    // Check if base rate is NaN or zero
    if (isNaN(finalRate) || finalRate === 0) {
      // Set all rates to zero
      setBaseRate("0");
      setDocketCharge("0");
      setGST("0");
      setTotal("0");
      setODACharges("0");
      setFinalWeight("0");
      return;
    }
  
    // Calculate Docket Charge
    const docketChargeValue = 350;
  
    // Calculate ODA charges
    const pincodeDetails = pincodeData.find(
      (item) => item.pincode === parseInt(destinationPincode)
    );
    const isODA = pincodeDetails ? pincodeDetails.ODA === "TRUE" : false;
    const odaChargesValue = isODA ? 750 : 0;
  
    // Calculate GST
    const gstAmount = (finalRate + docketChargeValue + odaChargesValue) * 0.18;
  
    // Calculate total
    const totalValue =
      finalRate + docketChargeValue + odaChargesValue + gstAmount;
  
    setBaseRate(finalRate.toFixed(2));
    setDocketCharge(docketChargeValue.toFixed(2));
    setGST(gstAmount.toFixed(2));
    setTotal(totalValue.toFixed(2));
    setODACharges(odaChargesValue.toFixed(2));
    setFinalWeight(finalWeight.toFixed(2));
    setShowBreakdown(true);
  };
  
  const addRow = () => {
    setRows([...rows, { quantity: "", height: "", length: "", width: "" }]);
  };

  const removeRow = (index) => {
    if (index !== 0) { // Prevent deletion of the first row
      const newRows = rows.filter((row, i) => i !== index);
      setRows(newRows);
    }
  };

  const handleRowChange = (index, field, value) => {
    const newRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(newRows);
  };
  

  const handleScrollToBottom = () => {
    const bottomSection = document.getElementById("bottom-section");
    if (bottomSection) {
      bottomSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Element with id 'bottom-section' not found.");
    }
  };

  const closePopup = () => {
    setShowBreakdown(false);
  };

  return (
    <div className="full-section">
      <div className="top-section">
        <div>
          <img src={image3} alt="" className="top-image3" />
        </div>

        <div className="text-container-top">
          <p className="gradient-text-top">Determine</p>
          <p className="text-top1">your shipping costs now</p>
          <p className="text-top3">
            Estimate courier charges using the Campus Express rate calculator.
          </p>
          <button className="button-top" onClick={handleScrollToBottom}>
            Calculate Now
          </button>
        </div>
      </div>
      <div className="bottom-section" id="bottom-section">
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="text-container">
              <p className="gradient-text-exp">Express</p>
              <p className="rc-text">Rate Calculator</p>
            </div>
            <div className="rectangle">
              <div className="container1">
                <div className="input-container">
                  <div className="placeholder-text-ori">Origin Pincode</div>
                  <div className="origin-pincode">
                    <input
                      type="number"
                      placeholder="Pickup Pincode"
                      id="origin-pincode"
                      name="originPincode"
                      value={originPincode}
                      onChange={(e) => setOriginPincode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="placeholder-text-del">Delivery Pincode</div>
                  <div className="del-pincode">
                    <input
                      type="number"
                      placeholder="Delivery Pincode"
                      id="destination-pincode"
                      name="destinationPincode"
                      value={destinationPincode}
                      onChange={(e) => setDestinationPincode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="placeholder-text-we">Weight</div>
                  <div className="wt">
                    <input
                      type="number"
                      placeholder="in Kgs"
                      id="weight"
                      name="weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>
                {rows.map((row, index) => (
                  <div key={index} className="row">
                    <div className="input-container">
                      <div className="placeholder-text-q">Quantity</div>
                      <div className="qt">
                        <input
                          type="number"
                          placeholder="Quantity"
                          id={`quantity-${index}`}
                          name="quantity"
                          value={row.quantity}
                          onChange={(e) => handleRowChange(index, "quantity", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="placeholder-text-h">Height</div>
                      <div className="ht">
                        <input
                          type="number"
                          placeholder="in cm"
                          id={`height-${index}`}
                          name="height"
                          value={row.height}
                          onChange={(e) => handleRowChange(index, "height", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="placeholder-text-l">Length</div>
                      <div className="length">
                        <input
                          type="number"
                          placeholder="in cm"
                          id={`length-${index}`}
                          name="length"
                          value={row.length}
                          onChange={(e) => handleRowChange(index, "length", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="placeholder-text-w">Width</div>
                      <div className="width">
                        <input
                          type="number"
                          placeholder="in cm"
                          id={`width-${index}`}
                          name="width"
                          value={row.width}
                          onChange={(e) => handleRowChange(index, "width", e.target.value)}
                        />
                      </div>
                    </div>
                    {index !== 0 && <button className="deleterow" onClick={() => removeRow(index)}>-</button>}
                  </div>
                ))}
                <button className="addrow" onClick={addRow}>+</button>
                <button className="buttonrate" onClick={handleCalculate}>
                  Calculate now
                </button>
                {pincodeError && <div className="error">{pincodeError}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup
        show={showBreakdown}
        onClose={closePopup}
        baseRate={baseRate}
        docketCharge={docketCharge}
        gst={gst}
        total={total}
        finalWeight={finalWeight}
        odaCharges={odaCharges}
      />
    </div>
  );
};

export default RateCalculator;