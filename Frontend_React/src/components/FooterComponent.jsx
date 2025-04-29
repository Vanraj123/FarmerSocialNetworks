// import React from 'react';
// import './FooterComponent.css';

// const FooterComponent = () => {
//     return (
//         <footer className="footer">
//             <div className="container">
//                 <span className="text-muted">© 2025 Farmer's Social Network. All rights reserved.</span>
//             </div>
//         </footer>
//     );
// };

// export default FooterComponent;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLeaf } from 'react-icons/fa';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row text-center text-md-start g-4">
          {/* About Section */}
          <div className="col-lg-5 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <FaLeaf className="text-success me-2 fs-4" />
              <h5 className="fw-bold text-uppercase mb-0">Farmer's Social Network</h5>
            </div>
            <p className="small mb-4">
              Empowering farmers with real-time solutions, cutting-edge technology, and expert agricultural insights. Grow better, farm smarter!
            </p>
            
            {/* Social Media Section */}
            <div className="d-flex gap-3 mb-4">
              <a href="#" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>
          
          {/* Quick Links Section - Simplified */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold text-uppercase mb-3">Important Links</h5>
            <ul className="list-unstyled quick-links">
              <li><a href="/" className="d-block py-2">Home</a></li>
              <li><a href="/about" className="d-block py-2">About Us</a></li>
              <li><a href="/services" className="d-block py-2">Services</a></li>
              <li><a href="/contact" className="d-block py-2">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold text-uppercase mb-3">Contact Us</h5>
            <div className="contact-info">
              <p className="small d-flex align-items-center mb-3">
                <FaMapMarkerAlt className="me-3 fs-5 text-success" /> 
                <span>123 Greenfield Road, Bangalore, India</span>
              </p>
              <p className="small d-flex align-items-center mb-3">
                <FaEnvelope className="me-3 fs-5 text-success" /> 
                <span>support@farmersnetwork.com</span>
              </p>
              <p className="small d-flex align-items-center mb-3">
                <FaPhone className="me-3 fs-5 text-success" /> 
                <span>+91 98765 43210</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright - Simplified */}
      <div className="py-3 mt-4 border-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <span>© {new Date().getFullYear()} Farmer's Social Network. All rights reserved.</span>
            </div>
            <div className="col-md-6">
              <ul className="list-inline mb-0 text-center text-md-end">
                <li className="list-inline-item"><a href="/terms" className="text-light small text-decoration-none">Terms</a></li>
                <li className="list-inline-item mx-3"><a href="/privacy" className="text-light small text-decoration-none">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Professional CSS with Social Icons */}
      <style jsx>{`
        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          transition: all 0.2s ease-in-out;
          font-size: 16px;
        }
        
        .social-icon:hover {
          background-color: #28a745;
          color: white;
        }
        
        .quick-links li a {
          color: #f8f9fa;
          transition: all 0.2s;
        }
        
        .quick-links li a:hover {
          color: #28a745;
          text-decoration: none;
        }
        
        footer {
          position: relative;
        }
        
        footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #28a745;
        }
      `}</style>
    </footer>
  );
};

export default FooterComponent;