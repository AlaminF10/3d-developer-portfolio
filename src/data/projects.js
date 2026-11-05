// featured projects. Edit freely:
//  - `liveUrl`: set to a deployed link, or null to hide the "Live" button
//  - `image`:   put a screenshot in public/projects/ and set e.g. "/projects/task-app.png";
//               null shows a generated gradient cover instead
//  - `featured`: true = shown large at the top of the Projects section

const GH = 'https://github.com/MohammadAlAmin10';

export const projects = [{
        id: 'task-manager',
        title: 'Full-Stack Task Management App',
        category: 'Full-Stack',
        description: 'A Trello/Asana-style task manager with JWT authentication, full CRUD, filtering and a responsive interface. Built as a complete React + Node.js + MongoDB application.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
        repoUrl: `${GH}/Full-Stack-Task-Management-App`,
        liveUrl: null,
        image: null,
        accent: ['#8b5cf6', '#22d3ee'],
        featured: true,
    },
    {
        id: 'expense-tracker',
        title: 'Multi-User Expense Tracker',
        category: 'Web App',
        description: 'Track shared and personal expenses across multiple users, with per-user records and summaries of where the money goes.',
        tags: ['JavaScript', 'Node.js', 'Web'],
        repoUrl: `${GH}/Multi-User-Expense-Tracker`,
        liveUrl: null,
        image: null,
        accent: ['#22c55e', '#14b8a6'],
        featured: true,
    },
    {
        id: 'portfolio-3d',
        title: '3D Developer Portfolio',
        category: '3D / Frontend',
        description: 'This website. An interactive 3D portfolio with React Three Fiber, adaptive quality for low-end devices, and a layered, data-driven architecture.',
        tags: ['React', 'Three.js', 'R3F', 'Tailwind'],
        repoUrl: `${GH}/3d-developer-portfolio`,
        liveUrl: null,
        image: null,
        accent: ['#f472b6', '#8b5cf6'],
        featured: true,
    },
    {
        id: 'graphics',
        title: 'Computer Graphics Project',
        category: 'Graphics',
        description: 'A C++ graphics program built for my Computer Graphics course, drawing and animating a scene with OpenGL primitives and transformations.',
        tags: ['C++', 'OpenGL', 'Graphics'],
        repoUrl: `${GH}/Graphics_Project`,
        liveUrl: null,
        image: null,
        accent: ['#f59e0b', '#ef4444'],
        featured: false,
    },
    {
        id: 'webtech',
        title: 'Web Technologies Project',
        category: 'Academic',
        description: 'A team web application for the Web Technologies course (Spring 2026), covering server-side PHP, forms, sessions and a MySQL database.',
        tags: ['PHP', 'MySQL', 'HTML/CSS'],
        repoUrl: `${GH}/Webtech_Project_G2`,
        liveUrl: null,
        image: null,
        accent: ['#3b82f6', '#6366f1'],
        featured: false,
    },
    {
        id: 'sqat',
        title: 'SQAT Projects',
        category: 'Testing',
        description: 'Software Quality Assurance & Testing coursework: test cases, test plans and testing of PHP applications.',
        tags: ['PHP', 'Testing', 'QA'],
        repoUrl: `${GH}/SQAT-Projects`,
        liveUrl: null,
        image: null,
        accent: ['#06b6d4', '#0ea5e9'],
        featured: false,
    },
];

export const projectCategories = [
    'All',
    ...new Set(projects.map(p => p.category)),
];