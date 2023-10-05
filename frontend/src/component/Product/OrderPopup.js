import React, { useState } from 'react';
import "./OrderPopup.css"

function OrderPopup({ isOpen, onClose, onSubmit,sendDataToParent }) {
  const [orderName, setOrderName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderName.trim() !== ''){
        onSubmit(orderName);
        setOrderName(''); // Clear the input field
    }
  };

  const sendData = () => {
    sendDataToParent(orderName); // Call the callback function to send data to the parent
  };

  return (
    <div className={`order-popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <h2>Enter Order Name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Order name"
            value={orderName}
            onChange={(e) => setOrderName(e.target.value)}
          />
          <button type="submit" onClick={sendData}>Submit</button>
          {/* Login logic at the time of order 10.35 */}
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default OrderPopup;
