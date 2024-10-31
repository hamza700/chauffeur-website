'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { paths } from '@/routes/paths';

const socialLinks = [
  { icon: <Facebook className="h-6 w-6" />, href: 'https://facebook.com' },
  { icon: <Twitter className="h-6 w-6" />, href: 'https://twitter.com' },
  { icon: <Instagram className="h-6 w-6" />, href: 'https://instagram.com' },
  { icon: <Linkedin className="h-6 w-6" />, href: 'https://linkedin.com' },
];

const quickLinks = [
  { label: 'Our Chauffeur Service', href: paths.services.chauffeur },
  { label: 'Our Hourly Rates Service', href: paths.services.hourlyRates },
  { label: 'FAQs', href: paths.faq.root },
  { label: 'Manage Bookings', href: paths.manageBookings.root },
];

const legalLinks = [
  { label: 'Privacy Policy', href: paths.privacy.root },
  { label: 'Terms and Conditions', href: paths.terms.root },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Social Links */}
          <div className="flex flex-col items-start">
            <Image
              src="/logo-white.png"
              alt="Chauffeur Platform Logo"
              width={180}
              height={60}
              className="mb-6"
            />
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-white" />
                <a
                  href="mailto:info@chauffeurplatform.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  info@chauffeurplatform.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-white" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-white" />
                <span className="text-gray-400">
                  123 Luxury Drive, Cityville, ST 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Chauffeur Platform. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
