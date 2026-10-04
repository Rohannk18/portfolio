import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rohan M Naik | Full-Stack Software Developer',
  description:
    'Full-Stack Software Developer and Computer Science graduate (B.Tech 2026) specializing in React.js, Node.js, Express.js, MongoDB, REST APIs, Java, Python, and ERP solutions.',
  keywords: [
    'Rohan M Naik',
    'Rohan Naik',
    'Software Developer',
    'Full Stack Developer',
    'React Developer',
    'Node.js Developer',
    'MERN Stack Developer',
    'Sapthagiri College of Engineering',
    'ERP Developer',
    'REST APIs',
    'Computer Science Graduate 2026',
    'Portfolio',
  ],
  authors: [{ name: 'Rohan M Naik', url: 'https://github.com/Rohannk18' }],
  creator: 'Rohan M Naik',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rohannaik.dev',
    title: 'Rohan M Naik | Full-Stack Software Developer',
    description:
      'Full-Stack Software Developer and Computer Science graduate (B.Tech 2026) specializing in React.js, Node.js, Express.js, MongoDB, REST APIs, Java, Python, and ERP solutions.',
    siteName: 'Rohan M Naik Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohan M Naik | Full-Stack Software Developer',
    description:
      'Full-Stack Software Developer and Computer Science graduate (B.Tech 2026) specializing in React.js, Node.js, Express.js, MongoDB, REST APIs, Java, Python, and ERP solutions.',
    creator: '@Rohannk18',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rohan M Naik',
    jobTitle: 'Full-Stack Software Developer',
    email: 'rohannaik8@gmail.com',
    url: 'https://rohannaik.dev',
    sameAs: [
      'https://github.com/Rohannk18',
      'https://www.linkedin.com/in/rohan-naik-785033353/',
    ],
    knowsAbout: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'JavaScript',
      'TypeScript',
      'Java',
      'Python',
      'SQL',
      'Role-Based Access Control',
      'ERP Systems',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Sapthagiri College of Engineering, Bengaluru',
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0e17] text-white selection:bg-indigo-600/40 selection:text-white">
        {children}
      </body>
    </html>
  );
}
