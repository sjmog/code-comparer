import React from 'react';
import 'pdfjs-dist';
import PDF, { Page } from 'react-pdf-pages';

class Pdf extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pages: null
    }
  }
  
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    console.log('file', this.props.file)
    return (
      <PDF url={"finals/" + this.props.file}
           onComplete={(pages) => this.setState({ pages })}>
        {this.state.pages &&
          <div>
            {this.state.pages.map((page) =>
              <Page key={page.key} page={page} />
            )}
          </div>
        }
      </PDF>
    );
  }
}

export default Pdf