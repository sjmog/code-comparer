import React from 'react';
import 'pdfjs-dist';
import Page from './Page';
import PDF from './PDF';

class Code extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pages: null,
      numPages: 0
    }
  }

  onComplete = (pages) => {
    this.setState({ pages })
  }

  render() {
    return (
      <PDF url={"finals/" + this.props.file}
           onComplete={(pages) => this.onComplete(pages)}>
        {this.state.pages &&
          <div>
            {this.state.pages.map((page) =>
              <Page key={page.key} pageNumber={page.pageNumber} page={page} />
            )}
          </div>
        }
      </PDF>
    );
  }
}

export default Code;