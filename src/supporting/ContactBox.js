import React, { useState } from 'react';
import './style/ContactBox.css';

const ContactBox = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name,
      phoneNumber,
      message,
    };

    // Create a script element
    const script = document.createElement('script');
    script.src = `https://script.google.com/macros/s/AKfycbzcBH91kz53AifupqUlX_AdAatekBtUfJlC_9fbgKIBD61fc_UK7kOeKBYIQ5JMur9f8Q/exec?function=doPost&callback=handleResponse&data=${encodeURIComponent(JSON.stringify(data))}`;
    document.body.appendChild(script);
  };

  // Callback function to handle the response
  window.handleResponse = (response) => {
    if (response.status === 'success') {
      alert('Your message has been sent successfully!');
      setName('');
      setPhoneNumber('');
      setMessage('');
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="contact-text-container">
        <div className="contact-text">
          <p>
            Feel free to shoot us a message and we will get back to you as soon as possible. You can also email us at <strong>info@vasantshobhafoundation.org</strong>
          </p>
        </div>
      </div>
      <form className="form" id="contactForm" onSubmit={handleSubmit}>
        <h2>CONTACT US</h2>
        <p>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            placeholder="Write your name here.."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </p>
        <p>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Let us know how to contact you back.."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoComplete="tel"
          />
        </p>
        <p>
          <label htmlFor="message">Message:</label>
          <input
            id="message"
            name="message"
            placeholder="What would you like to tell us.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="message"
          />
        </p>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactBox;
