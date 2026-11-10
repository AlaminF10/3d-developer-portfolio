// CONTENT LAYER — edit your text here, never inside components.
// (Single source of truth: the UI only reads from src/data/*.)

export const profile = {
    name: 'Md Al Amin',
    shortName: 'Al Amin',
    initials: 'AA',
    role: 'Full-Stack Developer',
    tagline: 'CSE Student @ AIUB',
    location: 'Gulshan-2, Dhaka, Bangladesh',
    email: 'mohammadalamin2352210@gmail.com',
    // Words that rotate in the hero headline
    roles: [
        'Full-Stack Developer',
        'React Developer',
        'Problem Solver',
        '3D Web Explorer',
    ],
    heroLine: 'I build fast, clean web apps — from the database to the pixels you see — and I like making the web feel a little more alive.',
    about: [
        "I'm a Computer Science & Engineering student at American International University-Bangladesh (AIUB) who enjoys turning ideas into working software. My main focus is full-stack web development with React, Node.js, Express and databases like MongoDB and MySQL.",
        'Alongside my coursework I build real projects: task managers with authentication, multi-user expense trackers, computer-graphics programs in C++ and, now, interactive 3D on the web with Three.js. I care about clean architecture, readable code and interfaces that feel good to use.',
        "I'm always learning something new and I'm open to internships, freelance work and collaborations.",
    ],
    highlights: [
        { value: '18+', label: 'GitHub repositories' },
        { value: '6', label: 'Featured projects' },
        { value: '10+', label: 'Technologies used' },
    ],
    // Add your CV as public/resume.pdf, then change this to "/resume.pdf".
    // While it is null, the "Download CV" button stays hidden.
    resumeUrl: '/resume.pdf',
};