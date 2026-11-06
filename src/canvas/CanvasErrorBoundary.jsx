import { Component } from 'react';

// If anything inside a <Canvas> throws (driver bug, lost context, etc.)
// we swap in a 2D fallback instead of crashing the whole page.
export default class CanvasErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('[3D] scene disabled:', error);
  }

  render() {
    return this.state.hasError
      ? this.props.fallback || null
      : this.props.children;
  }
}
