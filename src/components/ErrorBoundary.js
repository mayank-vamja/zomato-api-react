import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <p>{"Error : " + this.state.error}</p>
          <p>{"Info  : " + this.state.errorInfo}</p>
          <h3>Please click on Retry or try again after sometime.</h3>
          <button onClick={() => document.location.reload(true)}>Refresh</button>
        </>
      );
    }

    return this.props.children;
  }
}
