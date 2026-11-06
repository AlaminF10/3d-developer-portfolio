import * as THREE from "three";

// Draws a fake code editor onto a <canvas> and exposes it as a Three.js texture.
// `type(progress)` redraws with only the first N characters visible, giving a
// live "typing" effect on the 3D monitor without loading any image files.

const CODE = [
    [
        ["const ", "#c084fc"],
        ["developer", "#e2e8f0"],
        [" = {", "#94a3b8"]
    ],
    [
        ["  name", "#67e8f9"],
        [": ", "#94a3b8"],
        ["'Md Al Amin'", "#86efac"],
        [",", "#94a3b8"]
    ],
    [
        ["  role", "#67e8f9"],
        [": ", "#94a3b8"],
        ["'Full-Stack Developer'", "#86efac"],
        [",", "#94a3b8"]
    ],
    [
        ["  stack", "#67e8f9"],
        [": [", "#94a3b8"],
        ["'React'", "#86efac"],
        [", ", "#94a3b8"],
        ["'Node'", "#86efac"],
        [", ", "#94a3b8"],
        ["'Three.js'", "#86efac"],
        ["],", "#94a3b8"]
    ],
    [
        ["  location", "#67e8f9"],
        [": ", "#94a3b8"],
        ["'Dhaka, BD'", "#86efac"],
        [",", "#94a3b8"]
    ],
    [
        ["  openToWork", "#67e8f9"],
        [": ", "#94a3b8"],
        ["true", "#fbbf24"],
        [",", "#94a3b8"]
    ],
    [
        ["};", "#94a3b8"]
    ],
    [
        ["", "#94a3b8"]
    ],
    [
        ["function ", "#c084fc"],
        ["build", "#60a5fa"],
        ["(idea) {", "#94a3b8"]
    ],
    [
        ["  return ", "#c084fc"],
        ["idea", "#e2e8f0"],
        [".", "#94a3b8"],
        ["design", "#60a5fa"],
        ["()", "#94a3b8"]
    ],
    [
        ["    .", "#94a3b8"],
        ["code", "#60a5fa"],
        ["()", "#94a3b8"]
    ],
    [
        ["    .", "#94a3b8"],
        ["ship", "#60a5fa"],
        ["();", "#94a3b8"]
    ],
    [
        ["}", "#94a3b8"]
    ],
];

export const TOTAL_CHARS = CODE.reduce(
    (sum, line) => sum + line.reduce((s, [t]) => s + t.length, 0) + 1,
    0
);

export function createCodeScreen() {
    const W = 1024;
    const H = 640;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;

    function type(visibleChars, cursorOn) {
        // window
        ctx.fillStyle = "#0b0b1e";
        ctx.fillRect(0, 0, W, H);
        // title bar
        ctx.fillStyle = "#14142e";
        ctx.fillRect(0, 0, W, 54);
        ["#f87171", "#fbbf24", "#4ade80"].forEach((c, i) => {
            ctx.fillStyle = c;
            ctx.beginPath();
            ctx.arc(34 + i * 30, 27, 9, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.fillStyle = "#94a3b8";
        ctx.font = "500 22px 'JetBrains Mono', monospace";
        ctx.fillText("portfolio.js", 140, 35);

        ctx.font = "500 30px 'JetBrains Mono', monospace";
        let remaining = visibleChars;
        let cursor = { x: 80, y: 105 };

        CODE.forEach((line, row) => {
            const y = 105 + row * 40;
            ctx.fillStyle = "#3f3f6e";
            ctx.fillText(String(row + 1).padStart(2, " "), 18, y);
            let x = 80;
            for (const [text, color] of line) {
                if (remaining <= 0) break;
                const shown = text.slice(0, remaining);
                ctx.fillStyle = color;
                ctx.fillText(shown, x, y);
                x += ctx.measureText(shown).width;
                remaining -= shown.length;
                cursor = { x, y };
            }
            remaining -= 1; // newline
        });

        if (cursorOn) {
            ctx.fillStyle = "#a78bfa";
            ctx.fillRect(cursor.x + 2, cursor.y - 26, 14, 32);
        }
        texture.needsUpdate = true;
    }

    type(0, true);
    return { texture, type };
}