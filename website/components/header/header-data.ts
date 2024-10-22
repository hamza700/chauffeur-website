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
      { label: 'Chauffeur Service', href: '/services/chauffeur' },
      { label: 'Hourly Rates', href: '/services/hourly-rates' },
    ],
  },
  {
    label: 'Partner With Us',
    href: '/partner-with-us',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
];
