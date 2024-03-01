import React, { useEffect } from 'react';

export default function Contact() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;

    // Add error handling
    script.onerror = handleError;

    // Console log to verify script loading
    console.log('Script is being loaded...');

    // Append the script to the document body
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Error handling function
  const handleError = () => {
    console.error('Error loading script');
  };

  return (
    <div>
      <div
        className="visme_d"
        data-title="Business Contact Form"
        data-url="mxgvonyw-business-contact-form?fullPage=true"
        data-domain="forms"
        data-full-page="true"
        data-min-height="100vh"
        data-form-id="34391"
      ></div>
      <script src="https://static-bundles.visme.co/forms/vismeforms-embed.js"></script>
    </div>
  );
}
