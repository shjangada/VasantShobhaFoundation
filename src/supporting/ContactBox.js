import './style/ContactBox.css';

const ContactBox = () => {

  return (
    <div className="content-wrapper">
      <div className="contact-text-container">
        <div className="contact-text">
        <p>
          Feel free to send us a message and we will get back to you as soon as possible. You can also email us at{' '}
          <strong>
            <a href="mailto:info@vasantshobha.org" style={{ textDecoration: 'none', color: 'inherit' }}>
              info@vasantshobha.org
            </a>
          </strong>
        </p>
        </div>
      </div>
      <div className="form">
        <iframe
          src="https://form.jotform.com/241497124570154"
          title="Contact form"
          width="100%"
          height="600"
          frameBorder="0"
          allow="camera; microphone; autoplay; encrypted-media;"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactBox;
