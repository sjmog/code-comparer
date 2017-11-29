import React from 'react';
import Code from './Code'
import {Row, Column, Button} from 'react-foundation';
import './App.css';
import acj from 'comparative-judgement';

var _ = require('underscore');

const NUMBER_OF_JUDGEMENTS = 5
const JUDGE_NAME = 'Sam'
const JUDGE_COUNT = 1

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      decisions: [],
      results: [],
      pair: acj.selection.selectionSwiss(props.players),
      judgementIndex: 0
    }
  }

  judgeWinner = (judgement) => {
    const winnerId = judgement.target.id

    const winner = this.state.pair.find(pair => pair._id === Number(winnerId))
    const loser = this.state.pair.find(pair => pair._id !== Number(winnerId))

    this._recordJudgement(winner, 1, loser)
    this._recordJudgement(loser, 0, winner)

    this._updateModel(winner, loser)

    this.setState((prevState, props) => {
      return { 
        pair: acj.selection.selectionSwiss(this.props.players),
        judgementIndex: prevState.judgementIndex + 1
      }
    })
  }

  isComplete = () => {
    return this.state.judgementIndex >= NUMBER_OF_JUDGEMENTS - 1
  }

  results = () => {
    let results

    acj.estimation.estimateCJ('comparison', this.props.players, 4, (task, estimatedPlayers) => {
      const sortedByTrueScore = estimatedPlayers.slice().sort((player1, player2) => player1.trueScore - player2.trueScore)
      
      results = sortedByTrueScore.map((player) => {
        const raschScore = Math.round(acj.estimation.rasch(player.trueScore, 0) * 100)

        return <p>{player.file}: {raschScore} (raw: {player.trueScore})</p>
      })
    })

    return results
  }

  _recordJudgement = (player, win, opponent) => {
    player.comparisons++
    player.selected++
    player.observedScore += win

    if (!_.contains(player.opponents,opponent))
      player.opponents.push(opponent);

    player.decisions.push(opponent._id);
  }

  _updateModel = (winner, loser) => {
    this.state.decisions.push({
      judge: JUDGE_NAME,
      chosen: winner._id,
      notChosen: loser._id,
      timeTaken: 0
    })

    acj.btm.btmModel(this.state.decisions, null, null, null, null, (err, teams) => {
      for(var i = 0; i < this.props.players.length; i++){
        const player = this.props.players[i]
        var playerInModel = _.find(teams, (team) =>  { return player._id === team.team })
        
        if (playerInModel) {
          player.chosen = 0

          if (player._id === winner | player._id === loser)
            player.chosen = 1

          player.lastTrueScore = player.trueScore
          player.trueScore = playerInModel.theta
          player.seTrueScore = playerInModel.seTheta
        }

        player.iteration = JUDGE_COUNT
        player.judgement = this.state.judgementIndex + 1

        const clonedPlayer = Object.assign({}, player)
        this.state.results.push(clonedPlayer)
      }
    })
  }

  render() {
    let complete = null

    if(this.isComplete()) {
      complete = <p className="whole-page">{this.results()}</p>
    }

    return (
      <main className="main">
        {complete}
        <Row className="display">
          <Column small={4}>
            <Button id={this.state.pair[0]._id} onClick={this.judgeWinner}>
                Left
            </Button>
          </Column>
          <Column small={4}>
            <p className="center">If you could only advance one from a tech test, which would you pick?</p>
          </Column>
          <Column small={4}>
            <Button id={this.state.pair[1]._id} onClick={this.judgeWinner}>
                Right
            </Button>
          </Column>
        </Row>
        <Row className="display">
          <Column small={6}>
            <Code file={this.state.pair[0].file} />
          </Column>
          <Column small={6}>
            <Code file={this.state.pair[1].file} />
          </Column>
        </Row>
      </main>
    )
  }
}

export default App;