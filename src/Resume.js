import React from 'react';

export default function Resume() {
  return React.createElement('div', { style: { padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' } },
    React.createElement('h1', { style: { color: '#2563eb', fontSize: '2.5rem', marginBottom: '0' } }, 'Kritideepta Paul'),
    React.createElement('h3', { style: { color: '#4b5563', marginTop: '5px' } }, 'B.Tech-M.Tech CSE (Cybersecurity) @ NFSU Guwahati'),
    React.createElement('hr', { style: { margin: '20px 0' } }),
    React.createElement('h2', { style: { color: '#1e40af' } }, 'Skills & Expertise'),
    React.createElement('ul', null,
      React.createElement('li', null, React.createElement('strong', null, 'Programming & Web: '), 'C, C++, React, Next.js, Tailwind CSS'),
      React.createElement('li', null, React.createElement('strong', null, 'Security & CTFs: '), 'OSINT, Web Exploitation, Pwn, SQL Injection'),
      React.createElement('li', null, React.createElement('strong', null, 'Hardware: '), 'Digital Electronics, VHDL/Verilog')
    ),
    React.createElement('h2', { style: { color: '#1e40af' } }, 'Projects & Activities'),
    React.createElement('ul', null,
      React.createElement('li', null, React.createElement('strong', null, 'Security Screen Lock: '), 'C-based warning system for failed authentication attempts.'),
      React.createElement('li', null, React.createElement('strong', null, 'Calculated Chaos: '), 'Gaming YouTube channel utilizing a dual-boot Debian/Windows workflow.')
    )
  );
}
