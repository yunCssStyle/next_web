"use client";
import React from "react";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  fallback: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, fallback: props.fallback };
  }

  static getDerivedStateFromError(
    // error: Error,
    props: ErrorBoundaryProps
  ): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, fallback: props.fallback };
  }

  // componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  //   // You can also log the error to an error reporting service
  // }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
