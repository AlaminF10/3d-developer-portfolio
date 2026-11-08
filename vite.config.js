import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        // Keep three.js in its own chunk so the 2D page can paint before 3D code arrives.
        rollupOptions: {
            output: {
                manualChunks: {
                    three: ["three"],
                    r3f: ["@react-three/fiber", "@react-three/drei"],
                },
            },
        },
        chunkSizeWarningLimit: 900,
    },
});