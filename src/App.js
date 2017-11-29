import React from 'react';
import Pdf from './Pdf';
import {Row, Column} from 'react-foundation';
import './App.css';

var _ = require('underscore');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [
        { file: "Albion31.pdf", "_id": 1, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "Calum-W.pdf", "_id": 2, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "charlesemery15.pdf", "_id": 3, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "Ciancion.pdf", "_id": 4, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "ewintram.pdf", "_id": 5, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "GeorgeWhiting.pdf", "_id": 6, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "ker-an.pdf", "_id": 7, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "LarsFin.pdf", "_id": 8, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "Le5tes.pdf", "_id": 9, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "lunaticnick.pdf", "_id": 10, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "Meepit.pdf", "_id": 11, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "newtdogg.pdf", "_id": 12, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "rskyte.pdf", "_id": 13, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "samuel-c-johnson.pdf", "_id": 14, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "tallpress.pdf", "_id": 15, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "umairb1.pdf", "_id": 16, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
        { file: "Xin00163.pdf", "_id": 17, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0 },
      ]
    }
  }

  render() {
    return (

      <main className="main">
        <Row className="display">
          <Column small={6}>
            <Pdf file={this.state.players[0].file} />
          </Column>
          <Column small={6}>
            <Pdf file={this.state.players[1].file} />
          </Column>
        </Row>
      </main>
    )
  }
}

export default App