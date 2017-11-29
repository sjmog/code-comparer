import React from 'react';
import Pdf from './Pdf';
import {Row, Column} from 'react-foundation';
import './App.css';
import acj from 'comparative-judgement';

var _ = require('underscore');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      decisions: [],
      results: [],
      pair: acj.selection.selectionSwiss(props.players)
    }
  }

  render() {
    return (

      <main className="main">
        <Row className="display">
          <Column small={6}>
            <Pdf file={this.state.pair[0].file} />
          </Column>
          <Column small={6}>
            <Pdf file={this.state.pair[1].file} />
          </Column>
        </Row>
      </main>
    )
  }
}

export default App