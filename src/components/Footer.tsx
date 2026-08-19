"use client";
import React from "react";
import Link from "next/link";
import DoodleSocials from "./DoodleSocials";

export const FooterBackgroundGradient = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
      }}
    />
  );
};

export default function Footer() {
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Social Feed", href: "#features" },
        { label: "Members Directory", href: "#features" },
        { label: "Job Board", href: "#features" },
        { label: "Mentorship", href: "#features" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full sm:px-0" style={{
      backgroundColor: '#151515', // Slightly lighter than pure black to see the gradient better
      position: 'relative',
      height: 'fit-content',
      overflow: 'hidden',
      marginTop: '32px',
      color: 'white',
      borderTop: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '56px',
        position: 'relative',
        zIndex: 40
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          paddingBottom: '48px'
        }}>
          {/* Brand section */}
          <div className="brand-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/WIPA-Logo.png" alt="WIPA Logo" style={{ height: '48px' }} />
            </div>
            <p className="brand-text" style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#d1d5db' }}>
              Women's IP Alliance — Empowering women in Patents, Trademarks, Copyright, and Innovation.
            </p>
          </div>

          {/* Footer link sections */}
          <style dangerouslySetInnerHTML={{__html: `
            .brand-section {
              display: flex;
              flex-direction: column;
              gap: 16px;
              align-items: center;
            }
            .brand-text {
              text-align: center;
            }
            .footer-bottom {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 16px;
              font-size: 0.875rem;
              color: #9ca3af;
              text-align: center;
            }
            .product-line {
              white-space: nowrap;
              font-size: 0.875rem;
            }
            @media (min-width: 768px) {
              .brand-section {
                align-items: flex-start;
              }
              .brand-text {
                text-align: left;
              }
              .footer-bottom {
                flex-direction: row;
                justify-content: space-between;
              }
            }
            .footer-links-container {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 24px;
            }
            @media (min-width: 768px) {
              .footer-links-container {
                display: contents;
              }
            }
            .contact-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .contact-item-content {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            @media (min-width: 768px) {
              .contact-item {
                flex-direction: row;
                align-items: flex-start;
                text-align: left;
              }
              .contact-item-content {
                align-items: flex-start;
              }
            }
          `}} />
          <div className="footer-links-container">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 style={{ color: 'white', fontSize: '1.125rem', fontWeight: '600', marginBottom: '24px' }}>
                  {section.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        style={{ color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s ease' }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#3ca2fa'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#d1d5db'}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact section */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.125rem', fontWeight: '600', marginBottom: '24px' }}>
              Contact Us
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li className="contact-item" style={{ gap: '12px', color: '#d1d5db' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3ca2fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <div className="contact-item-content" style={{ gap: '4px', fontSize: '0.875rem' }}>
                  <a href="mailto:wipa@northonsprmarketing.com" style={{ color: '#d1d5db', textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.color = '#3ca2fa'} onMouseOut={(e) => e.currentTarget.style.color = '#d1d5db'}>wipa@northonsprmarketing.com</a>
                  <a href="mailto:dhruva@northonsprmarketing.com" style={{ color: '#d1d5db', textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.color = '#3ca2fa'} onMouseOut={(e) => e.currentTarget.style.color = '#d1d5db'}>dhruva@northonsprmarketing.com</a>
                </div>
              </li>
              <li className="contact-item" style={{ gap: '12px', color: '#d1d5db' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3ca2fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div className="contact-item-content" style={{ gap: '4px', fontSize: '0.875rem' }}>
                  <a href="tel:+4402038130457" style={{ color: '#d1d5db', textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.color = '#3ca2fa'} onMouseOut={(e) => e.currentTarget.style.color = '#d1d5db'}>+44 (0)203-813-0457 (UK)</a>
                  <a href="tel:+919054575950" style={{ color: '#d1d5db', textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.color = '#3ca2fa'} onMouseOut={(e) => e.currentTarget.style.color = '#d1d5db'}>+91 90545 75950 (IN)</a>
                </div>
              </li>
              <li className="contact-item" style={{ gap: '12px', color: '#d1d5db' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3ca2fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <div className="contact-item-content" style={{ gap: '12px', fontSize: '0.875rem' }}>
                  <div className="contact-item-content" style={{ gap: '2px' }}>
                    <span className="block md:hidden text-white font-semibold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '2px' }}>
                      <img src="https://flagcdn.com/w20/gb.png" srcSet="https://flagcdn.com/w40/gb.png 2x" width="20" alt="UK" />
                      United Kingdom Office
                    </span>
                    <span>UK: 60 Castle Street, Dover, CT16 1PJ, United Kingdom</span>
                  </div>
                  <div className="contact-item-content" style={{ gap: '2px' }}>
                    <span className="block md:hidden text-white font-semibold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '2px' }}>
                      <img src="https://flagcdn.com/w20/in.png" srcSet="https://flagcdn.com/w40/in.png 2x" width="20" alt="India" />
                      India Office
                    </span>
                    <span>IN: E-606, Prahlad Nagar Trade Center(PNTC), Times Of India Press Rd, Satellite, Shyamal, Ahmedabad, Gujarat, India, 380015</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr style={{ borderTop: '1px solid #374151', margin: '32px 0' }} />

        {/* Footer bottom */}
        <div className="footer-bottom">
          {/* Copyright */}
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} WIPA. All rights reserved.
          </p>
          
          <DoodleSocials />
          
          <span className="product-line">Product of Northon's Media PR & Marketing Ltd</span>
        </div>
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
