export const ROLE_MODULES = {
  customer: [
    { id: 'home', label: 'Overview', icon: '⌂' },
    { id: 'discover', label: 'Discover services', icon: '✦' },
    { id: 'bookings', label: 'My bookings', icon: '▣' },
    { id: 'support', label: 'Support & SOS', icon: '♡' }
  ],
  partner: [
    { id: 'home', label: 'Overview', icon: '⌂' },
    { id: 'bookings', label: 'My bookings', icon: '▣' },
    { id: 'partners', label: 'Partners', icon: '♧' },
    { id: 'inventory', label: 'Inventory kits', icon: '◇' },
    { id: 'support', label: 'Support & SOS', icon: '♡' }
  ],
  admin: [
    { id: 'home', label: 'Overview', icon: '⌂' },
    { id: 'operations', label: 'Operations', icon: '◈' },
    { id: 'partners', label: 'Partners', icon: '♧' },
    { id: 'inventory', label: 'Inventory kits', icon: '◇' },
    { id: 'support', label: 'Support & SOS', icon: '♡' }
  ]
};

export const SERVICES = [
  { id: 's1', name: 'Bloom signature facial', category: 'Skin', duration: '60 min', price: 1200, art: '✺', description: 'A calming, glow-focused facial with a botanical finish.' },
  { id: 's2', name: 'Blow dry & styling', category: 'Hair', duration: '45 min', price: 850, art: '⌁', description: 'Salon-fresh volume and shape, brought to your doorstep.' },
  { id: 's3', name: 'Gel manicure', category: 'Nails', duration: '60 min', price: 950, art: '✿', description: 'Long-wear colour, cuticle care, and a neat finish.' },
  { id: 's4', name: 'Relaxation massage', category: 'Wellness', duration: '75 min', price: 1600, art: '☼', description: 'A tailored full-body session to reset your week.' },
  { id: 's5', name: 'Bridal glow ritual', category: 'Packages', duration: '120 min', price: 2800, art: '✧', description: 'A complete pre-event ritual for skin, hair, and calm.' },
  { id: 's6', name: 'Express pedicure', category: 'Nails', duration: '40 min', price: 700, art: '◌', description: 'A fresh, polished reset for busy days.' }
];

export const INITIAL_STATE = {
  role: 'customer',
  view: 'home',
  address: 'Home • 14 Green Park',
  bookings: [
    {
      id: 'BL-1042',
      service: 'Bloom signature facial',
      partner: 'Anika Rao',
      date: '2026-09-19',
      time: '10:30 AM',
      status: 'Confirmed',
      address: 'Home • 14 Green Park',
      price: 1200
    },
    {
      id: 'BL-1038',
      service: 'Blow dry & styling',
      partner: 'Meera Kapoor',
      date: '2026-09-12',
      time: '4:00 PM',
      status: 'Completed',
      address: 'Home • 14 Green Park',
      price: 850
    }
  ]
};
