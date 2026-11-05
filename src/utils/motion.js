// Reusable Framer Motion variants so every section animates consistently.

export const fadeUp = (delay = 0, distance = 40) => ({
    hidden: { opacity: 0, y: distance },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 70, damping: 16, delay },
    },
});

export const fadeIn = (direction = "up", delay = 0, duration = 0.7) => {
    const offset = 60;
    const axis = {
        left: { x: offset, y: 0 },
        right: { x: -offset, y: 0 },
        up: { x: 0, y: offset },
        down: { x: 0, y: -offset },
    }[direction];
    return {
        hidden: { opacity: 0, ...axis },
        show: { opacity: 1, x: 0, y: 0, transition: { duration, delay, ease: [0.22, 1, 0.36, 1] } },
    };
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
});