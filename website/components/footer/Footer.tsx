import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const socialLinks = [
  { icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com' },
  { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com' },
  { icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com' },
  { icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com' },
];

const quickLinks = [
  { label: 'Our Services', href: '/services' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Manage Bookings', href: '/manage-bookings' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms and Conditions', href: '/terms-and-conditions' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div className="flex flex-col items-start">
            <Image src="/logo-white.svg" alt="Chauffeur Platform Logo" width={150} height={50} className="mb-4" />
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-gray-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-gray-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:info@chauffeurplatform.com" className="hover:text-gray-300">info@chauffeurplatform.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+1234567890" className="hover:text-gray-300">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Luxury Drive, Cityville, ST 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Chauffeur Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;