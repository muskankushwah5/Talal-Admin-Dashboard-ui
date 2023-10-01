import React from 'react';
const currentYear = new Date().getFullYear();

const Footer = () => (
  <div className="mt-24">
    <p className="dark:text-gray-200 text-gray-700 text-center m-20">
      {`© ${currentYear} All rights reserved by Talal-Al-ghanim Groups `}
    </p>
  </div>
);

export default Footer;