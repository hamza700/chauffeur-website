import { paths } from "@/routes/paths";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    label: 'Our Services',
    href: paths.services.chauffeur,
    children: [
      { label: 'Chauffeur Service', href: paths.services.chauffeur },
      { label: 'Hourly Rates', href: paths.services.hourlyRates },
    ],
  },
  {
    label: 'Partner With Us',
    href: paths.partnerWithUs,
  },
  {
    label: 'FAQ',
    href: paths.faq.root,
  },
];
