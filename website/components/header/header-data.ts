export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    label: 'Our Services',
    href: '#',
    children: [
      { label: 'Chauffeur Service', href: '/services?type=chauffeur' },
      { label: 'Hourly Rates', href: '/services?type=hourly' },
    ],
  },
  {
    label: 'Partner With Us',
    href: process.env.NEXT_PUBLIC_PARTNER_LINK || '#',
  },
];
