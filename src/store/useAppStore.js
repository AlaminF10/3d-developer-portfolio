import { create } from 'zustand';

// ViewModel-style global state (MVVM): components subscribe to slices
// and re-render only when their slice changes.
export const useAppStore = create(set => ({
    activeSection: 'hero',
    setActiveSection: activeSection => set({ activeSection }),

    menuOpen: false,
    setMenuOpen: menuOpen => set({ menuOpen }),

    // Set to true by the 3D loader once the hero scene has finished loading.
    sceneReady: false,
    setSceneReady: sceneReady => set({ sceneReady }),
}));