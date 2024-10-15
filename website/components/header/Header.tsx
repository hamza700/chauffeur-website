'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { navItems } from './header-data';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMouseEnter = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  }, []);

  return (
    <header className="bg-primary text-primary-foreground shadow-lg relative z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.webp"
            alt="Chauffeur Platform Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="space-x-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-400 text-white font-medium">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-[220px] p-3 bg-gray-900 rounded-md shadow-lg">
                        {item.children.map((child) => (
                          <ListItem
                            key={child.label}
                            title={child.label}
                            href={child.href}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </div>
                ) : (
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent hover:bg-gray-400 text-white font-medium'
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center space-x-4">
          <SignedIn>
            <Link
              href="/manage-bookings"
              className="text-white hover:text-gray-300 font-medium"
            >
              Manage Bookings
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: 'h-10 w-10',
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="bg-white text-black hover:bg-gray-200"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" className="lg:hidden p-2" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-gray-900 px-4 py-3 border-t border-gray-700">
          {navItems.map((item) => (
            <div key={item.label} className="py-2">
              {item.children ? (
                <NavigationMenu orientation="vertical">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="w-full justify-between text-white">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="w-full p-2 bg-gray-800 rounded-md">
                          {item.children.map((child) => (
                            <ListItem
                              key={child.label}
                              title={child.label}
                              href={child.href}
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Link
                  href={item.href}
                  className="block py-2 text-white hover:text-gray-300 font-medium"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <SignedIn>
            <Link
              href="/manage-bookings"
              className="block py-2 text-white hover:text-gray-300 font-medium"
            >
              Manage Bookings
            </Link>
            <div className="py-2">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'h-10 w-10',
                  },
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="w-full mt-2 bg-white text-black hover:bg-gray-200"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </nav>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white text-gray-300',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-gray-400 mt-1">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Header;
