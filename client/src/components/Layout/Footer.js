import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="order">
          <h4>Spicy Slice</h4>
          <ul>
            <li>Deals</li>
            <li>Pizza</li>
            <li>Sides</li>
            <li>Drinks</li>
            <li>Desserts</li>
          </ul>
        </div>
        <div className="learn-more">
          <h4>Learn more</h4>
          <ul>
            <li>Privacy</li>
            <li>Security</li>
            <li>Terms of service</li>
            <li>Help & support</li>
            <li>Report a Fraud</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="s-links">
          <p>Social links</p>
          <div className="links">
            <a href="https://x.com/?lang=en-in">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://www.google.com/">
              <i class="fa-brands fa-google"></i>
            </a>
            <a href="https://www.facebook.com/">
              <i class="fa-brands fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <p id="copyright">
        By continuing past this page, you agree to our Terms of Service, Cookie
        Policy, Privacy Policy and Content Policies. All trademarks are
        properties of their respective owners 2008-2025 © PizzaDeliver Ltd. All
        rights reserved.
      </p>
    </>
  );
};

export default Footer;
