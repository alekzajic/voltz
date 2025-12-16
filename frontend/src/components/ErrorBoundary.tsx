import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
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
        console.error('Uncaught error:', error, errorInfo);
    }

    public handleRetry = () => {
        this.setState({ hasError: false, error: null });
        // window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-6 text-center bg-surface border border-gray-200 rounded-lg shadow-sm">
                    <div className="bg-red-100 p-3 rounded-full mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h2>
                    <p className="text-gray-500 mb-6 max-w-md">
                        {this.state.error?.message || 'An unexpected error occurred while rendering this component.'}
                    </p>
                    <button
                        onClick={this.handleRetry}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reload
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
