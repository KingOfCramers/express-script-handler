import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    /// Send an error message to the server...
  }
  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          Something went wrong.
          <details>{this.state.error && this.state.error.toString()}</details>
          <br />
          <details>{this.state.errorInfo.errorStack}</details>
        </div>
      );
    }
    return this.props.children; // If there's no error, just render the children
  }
}
