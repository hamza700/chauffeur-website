'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, BadgeCheck, CreditCard, LogOut } from 'lucide-react';
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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navItems } from './header-data';
import { useAuthContext } from '@/auth/hooks';
import { signOut } from '@/auth/context/supabase';
import { paths } from '@/routes/paths';

function Header() {
  const { user } = useAuthContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isSigningOut, setIsSigningOut] = useState(false);

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

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      // Add a timeout to prevent infinite loading state
      const signOutPromise = signOut();
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Sign out timeout')), 5000);
      });

      // Race between sign out and timeout
      await Promise.race([signOutPromise, timeoutPromise]);

      // Clear any local state/storage if needed
      window.localStorage.removeItem('supabase.auth.token');

      // Force a hard reload to clear all state
      window.location.href = paths.home;
    } catch (error) {
      console.error('Sign out error:', error);
      // Force sign out on error
      window.localStorage.clear();
      window.location.href = paths.home;
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-lg relative z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={paths.home} className="flex items-center">
          <Image
            src="/mishwar-white.jpeg"
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10 rounded-full">
                    <AvatarImage
                      src={
                        user.user_metadata?.avatar_url || '/default-avatar.png'
                      }
                      alt={user.user_metadata?.display_name || 'User'}
                    />
                    <AvatarFallback>
                      {user.user_metadata?.display_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.display_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href={paths.manageBookings.root}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Manage Booking</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={paths.account}>
                      <BadgeCheck className="mr-2 h-4 w-4" />
                      <span>Account</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{isSigningOut ? 'Signing out...' : 'Log out'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={paths.auth.signIn}>
              <Button variant="secondary">Sign In</Button>
            </Link>
          )}
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
          {user ? (
            <>
              <Link
                href={paths.manageBookings.root}
                className="block py-2 text-white hover:text-gray-300 font-medium"
              >
                Manage Bookings
              </Link>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="block w-full text-left py-2 text-white hover:text-gray-300 font-medium disabled:opacity-50"
              >
                {isSigningOut ? 'Signing out...' : 'Sign Out'}
              </button>
            </>
          ) : (
            <Link
              href={paths.auth.signIn}
              className="block py-2 text-white hover:text-gray-300 font-medium"
            >
              Sign In
            </Link>
          )}
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
