import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-5 border-top">
      <div className="container text-center">
        <p className="mb-2">&copy; DK 2025 | By Didik Kurniawan</p>
        <div className="d-flex justify-content-center gap-3">
          <a
            href="https://www.linkedin.com/in/didik2584/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/icons/linkedin-color-svgrepo-com.svg"
              alt="LinkedIn"
              width={24}
              height={24}
            />
          </a>
          <a
            href="https://github.com/Didikkurniawan3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/icons/github-svgrepo-com.svg"
              alt="GitHub"
              width={24}
              height={24}
            />
          </a>
          <a
            href="https://www.instagram.com/didikkurniawan03/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/icons/instagram-1-svgrepo-com.svg"
              alt="Instagram"
              width={24}
              height={24}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
