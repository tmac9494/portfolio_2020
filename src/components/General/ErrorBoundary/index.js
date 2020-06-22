import styles from './styles';
import React from 'react';
import StyledNavLink from '../StyledNavLink';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.styles = styles;
    if (props.styles) {
      Object.keys(props.styles).forEach(key => this.styles[key] = {...styles[key], ...props.styles[key]})
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // console.log(error)
    if (this.props.handleErrorReport) this.props.handleErrorReport(error, errorInfo);
    this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.errorRender ? this.props.errorRender
      : <div style={this.styles.container}>
          <div style={this.styles.content}>
            <svg style={this.styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M228.9 79.9L51.8 403.1C40.6 423.3 55.5 448 78.9 448h354.3c23.3 0 38.2-24.7 27.1-44.9L283.1 79.9c-11.7-21.2-42.5-21.2-54.2 0zM273.6 214L270 336h-28l-3.6-122h35.2zM256 402.4c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4 19.1 8.1 19.1 18.4-8.4 18.4-19.1 18.4z"/></svg>
            <p style={this.styles.message}>{this.props.message || 'Uh oh! Something went wrong.'}</p>
            {this.props.backRoute &&
              <StyledNavLink
                to={this.props.backRoute}
                styles={this.styles.link}
                hoverStyles={this.styles.linkHover}
              >
                {this.props.backRouteText || 'Back'}
              </StyledNavLink>
            }
          </div>
        </div>;
    }

    return !this.state.error ? this.props.children : null;
  }
}

export default ErrorBoundary;
