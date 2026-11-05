import { useMemo } from "react";

// Returns false on old browsers / disabled GPUs so we can show a 2D fallback
// instead of a blank black box.
export function useWebGLSupport() {
    return useMemo(() => {
        try {
            const canvas = document.createElement("canvas");
            return !!(
                window.WebGLRenderingContext &&
                (canvas.getContext("webgl2") || canvas.getContext("webgl"))
            );
        } catch {
            return false;
        }
    }, []);
}