import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Page extends Component {
  static propTypes = {
    page: PropTypes.shape({
      pageNumber: PropTypes.number.isRequired,
      file: PropTypes.shape({
        getPage: PropTypes.func.isRequired
      })
    }).isRequired
  };

  renderPage() {
    const { pageNumber, file } = this.props.page;
    file
      .getPage(pageNumber)
      .then(page => {
        // Prepare canvas using PDF page dimensions
        const canvas = ReactDOM.findDOMNode(this.refs["canvas"]);
        if (!canvas) return;
        const width = canvas.clientWidth;

        // Figure out page scale using known width
        const scale = width / page.getViewport(1).width;
        const pixelScale = window.devicePixelRatio || 1; // for retina
        const viewport = page.getViewport(scale * pixelScale);
        const height = width * (viewport.height / viewport.width);

        if (typeof this.props.onSizeReady === "function")
          this.props.onSizeReady(width, height);

        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      })
      .catch(error => {
        throw error;
      });
  }

  componentDidMount() {
    this.renderPage();
  }

  render() {
    const { style, className } = this.props;
    return (
      <canvas
        className={className}
        style={{ ...style, width: "100%", height: "auto", display: "block" }}
        ref="canvas"
      />
    );
  }
}