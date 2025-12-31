import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from './Card';
import { Button } from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-brutal-pink">
          <Card className="max-w-md">
            <h1 className="text-3xl font-bold mb-4">💥 CRASH!</h1>
            <p className="mb-4 font-mono text-sm">
              {this.state.error?.message || 'Something went wrong'}
            </p>
            <Button onClick={this.handleReset} variant="yellow">
              GO HOME
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}