import React from 'react';
import Pdf from './Pdf';
import {Row, Column} from 'react-foundation';
import './App.css';

class App extends React.Component {
  render() {
    return (

      <main className="main">
        <Row className="display">
          <Column small={6}>
            <Pdf file="Albion31.pdf" />
          </Column>
          <Column small={6}>
            <Pdf file="Calum-W.pdf" />
          </Column>
        </Row>
      </main>
    )
  }
}

export default App