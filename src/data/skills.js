import {
    SiJavascript,
    SiReact,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiMysql,
    SiPhp,
    SiPython,
    SiCplusplus,
    SiThreedotjs,
    SiTailwindcss,
    SiHtml5,
    SiCss,
    SiGit,
    SiGithub,
    SiDocker,
    SiNpm,
    SiPostman,
} from "react-icons/si";

// `level` (0–100) drives the small progress bar. Be honest — recruiters notice.
export const skillGroups = [{
        title: "Frontend",
        skills: [
            { name: "React", icon: SiReact, color: "#61dafb", level: 80 },
            { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", level: 85 },
            { name: "Three.js / R3F", icon: SiThreedotjs, color: "#ffffff", level: 60 },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8", level: 75 },
            { name: "HTML5", icon: SiHtml5, color: "#e34f26", level: 90 },
            { name: "CSS3", icon: SiCss, color: "#1572b6", level: 85 },
        ],
    },
    {
        title: "Backend & Data",
        skills: [
            { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e", level: 75 },
            { name: "Express", icon: SiExpress, color: "#ffffff", level: 75 },
            { name: "MongoDB", icon: SiMongodb, color: "#47a248", level: 70 },
            { name: "MySQL", icon: SiMysql, color: "#4479a1", level: 75 },
            { name: "PHP", icon: SiPhp, color: "#777bb4", level: 70 },
        ],
    },
    {
        title: "Languages & Tools",
        skills: [
            { name: "Python", icon: SiPython, color: "#3776ab", level: 70 },
            { name: "C++", icon: SiCplusplus, color: "#00599c", level: 75 },
            { name: "Git", icon: SiGit, color: "#f05032", level: 80 },
            { name: "GitHub", icon: SiGithub, color: "#ffffff", level: 80 },
            { name: "Docker", icon: SiDocker, color: "#2496ed", level: 50 },
            { name: "npm", icon: SiNpm, color: "#cb3837", level: 75 },
            { name: "Postman", icon: SiPostman, color: "#ff6c37", level: 70 },
        ],
    },
];

// Flat list of names for the 3D skills globe.
export const globeSkills = skillGroups.flatMap((g) => g.skills.map((s) => ({ name: s.name, color: s.color })));

// Concepts — shown as chips. (Your Software Architecture course pays off here.)
export const concepts = [
    "REST APIs", "JWT Auth", "MVC / MVVM", "SOLID", "Design Patterns",
    "Layered Architecture", "Responsive Design", "Software Testing",
];