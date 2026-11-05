import { useMemo } from "react";
// STRATEGY PATTERN
// Each profile is an interchangeable "rendering strategy". The 3D
// components never check the device themselves — they just read the
// chosen profile. Adding a new tier = adding one object here.

export const QUALITY_PROFILES = {
    high: {
        name: "high",
        dpr: [1, 2],
        starCount: 6000,
        shadows: true,
        antialias: true,
        floatSpeed: 1.6,
        globeTags: true,
    },
    low: {
        name: "low",
        dpr: [1, 1.25],
        starCount: 1800,
        shadows: false,
        antialias: false,
        floatSpeed: 1,
        globeTags: true,
    },
    // Visitor asked the OS for reduced motion: keep 3D, but still.
    calm: {
        name: "calm",
        dpr: [1, 1.5],
        starCount: 1500,
        shadows: false,
        antialias: true,
        floatSpeed: 0,
        globeTags: true,
    },
};

function detectProfileName() {
    if (typeof window === "undefined") return "high";

    const reducedMotion =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return "calm";

    const isMobile =
        /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth < 768;
    const cores = navigator.hardwareConcurrency || 8;
    const memory = navigator.deviceMemory || 8; // Chrome-only API; undefined elsewhere
    const fewCores = cores <= 4;
    const lowMemory = memory <= 4;

    return isMobile || fewCores || lowMemory ? "low" : "high";
}

export function useDeviceQuality() {
    return useMemo(() => QUALITY_PROFILES[detectProfileName()], []);
}