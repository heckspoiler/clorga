import { Url } from 'url';

export type PricingTier = {
  title: string;
  price: string;
  priceId?: string;
  link?: any;
  features: string[];
};

export const monthlyPricingTiers: PricingTier[] = [
  {
    title: 'Free Tier',
    price: '4.99',
    link:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_bIYeWId5W6K62fmbII'
        : '',
    priceId:
      process.env.NODE_ENV === 'development'
        ? 'prod_QyOLg1Y1N6EM9g'
        : 'prod_QyOLg1Y1N6EM9g',
    features: [
      '1 User',
      '3 Projects',
      '5 GB Storage',
      'Email Support',
      'Basic Analytics',
    ],
  },
  {
    title: 'Pro Tier',
    price: '9.99 per seat',
    link: process.env.NODE_ENV === 'development' ? '********' : '',
    priceId: process.env.NODE_ENV === 'development' ? '********' : '',
    features: [
      '5 Users',
      'Unlimited Projects',
      '50 GB Storage',
      'Priority Email Support',
      'Advanced Analytics',
    ],
  },
  {
    title: 'Enterprise Tier',
    price: '19.99 per seat',
    link: process.env.NODE_ENV === 'development' ? '********' : '',
    priceId: process.env.NODE_ENV === 'development' ? '********' : '',
    features: [
      'Unlimited Users',
      'Unlimited Projects',
      '1 TB Storage',
      'Priority Email Support',
      'Custom Analytics',
    ],
  },
];

export const yearlyPricingTiers: PricingTier[] = [
  {
    title: 'Free Tier',
    link:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_3cs4i4c1Sc4q7zG8wx'
        : '',
    priceId:
      process.env.NODE_ENV === 'development'
        ? 'prod_QyOcetOGeBxSWz'
        : 'prod_QyOcetOGeBxSWz',
    price: `${4.99 * 11 + 0.1}$`,
    features: [
      '1 User',
      '3 Projects',
      '5 GB Storage',
      'Email Support',
      'Basic Analytics',
    ],
  },
  {
    title: 'Pro Tier',
    price: `${9.99 * 11 + 0.1}$ per seat`,
    link: process.env.NODE_ENV === 'development' ? '********' : '',
    priceId: process.env.NODE_ENV === 'development' ? '********' : '',
    features: [
      '5 Users',
      'Unlimited Projects',
      '50 GB Storage',
      'Priority Email Support',
      'Advanced Analytics',
    ],
  },
  {
    title: 'Enterprise Tier',
    price: `${(Math.round((19.99 * 11 + 0.1) * 100) / 100).toFixed(
      2
    )}$ per seat`,
    link: process.env.NODE_ENV === 'development' ? '********' : '',
    priceId: process.env.NODE_ENV === 'development' ? '********' : '',
    features: [
      'Unlimited Users',
      'Unlimited Projects',
      '1 TB Storage',
      'Priority Email Support',
      'Custom Analytics',
    ],
  },
];
