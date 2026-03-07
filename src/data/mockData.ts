import { ScrapeResult, Category } from '../types/scrape';

export const mockCategories: Category[] = [
  { id: '1', name: 'Work' },
  { id: '2', name: 'Personal' },
  { id: '3', name: 'Research' },
  { id: '4', name: 'Learning' },
  { id: '5', name: 'Projects' }
];

const categories = ['Work', 'Personal', 'Research', 'Learning', 'Projects'];

export const mockResults: ScrapeResult[] = [
  {
    id: '1',
    url: 'https://example.com',
    title: 'Example Company',
    date: '2026-03-05',
    category: categories[Math.floor(Math.random() * categories.length)],
    summary: 'This website introduces a company and describes its services and contact information.',
    headings: [
      'Welcome to Example Company',
      'Our Services',
      'Contact Us'
    ],
    links: [
      'https://example.com/about',
      'https://example.com/services',
      'https://example.com/contact'
    ]
  },
  {
    id: '2',
    url: 'https://techstartup.io',
    title: 'Tech Startup Solutions',
    date: '2026-03-04',
    category: categories[Math.floor(Math.random() * categories.length)],
    summary: 'A modern technology startup offering innovative software solutions for businesses.',
    headings: [
      'Innovative Solutions',
      'Our Technology Stack',
      'Client Success Stories',
      'Get Started Today'
    ],
    links: [
      'https://techstartup.io/products',
      'https://techstartup.io/pricing',
      'https://techstartup.io/blog',
      'https://techstartup.io/careers'
    ]
  },
  {
    id: '3',
    url: 'https://designstudio.com',
    title: 'Creative Design Studio',
    date: '2026-03-03',
    category: categories[Math.floor(Math.random() * categories.length)],
    summary: 'Award-winning design studio specializing in branding and digital experiences.',
    headings: [
      'Our Portfolio',
      'Design Process',
      'Meet the Team',
      'Start Your Project'
    ],
    links: [
      'https://designstudio.com/portfolio',
      'https://designstudio.com/services',
      'https://designstudio.com/team',
      'https://designstudio.com/contact'
    ]
  },
  {
    id: '4',
    url: 'https://healthwellness.org',
    title: 'Health & Wellness Center',
    date: '2026-03-02',
    category: categories[Math.floor(Math.random() * categories.length)],
    summary: 'Comprehensive health and wellness services focusing on preventive care and holistic healing.',
    headings: [
      'Our Approach',
      'Services Offered',
      'Patient Testimonials',
      'Book Appointment'
    ],
    links: [
      'https://healthwellness.org/services',
      'https://healthwellness.org/doctors',
      'https://healthwellness.org/blog',
      'https://healthwellness.org/appointments'
    ]
  },
  {
    id: '5',
    url: 'https://edulearn.edu',
    title: 'EduLearn Online Platform',
    date: '2026-03-01',
    category: categories[Math.floor(Math.random() * categories.length)],
    summary: 'Online learning platform offering courses in technology, business, and creative arts.',
    headings: [
      'Course Catalog',
      'Learn From Experts',
      'Student Success',
      'Enroll Now'
    ],
    links: [
      'https://edulearn.edu/courses',
      'https://edulearn.edu/instructors',
      'https://edulearn.edu/pricing',
      'https://edulearn.edu/signup'
    ]
  }
];
