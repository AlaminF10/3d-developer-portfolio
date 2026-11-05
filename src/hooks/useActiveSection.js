import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

// OBSERVER PATTERN: an IntersectionObserver watches every section and
// publishes the visible one to the store; the navbar just subscribes.
export function useActiveSection(ids) {
    const setActiveSection = useAppStore((s) => s.setActiveSection);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActiveSection(visible.target.id);
            }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids, setActiveSection]);
}